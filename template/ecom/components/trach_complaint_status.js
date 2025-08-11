
const styles = {
	statusCss: {
		fontSize: '18px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
};
const TrackComplaintStatus= (props) =>{
		
	const [loading, setLoading] = React.useState(false);
	const [validated, setValidated] = React.useState(false);
	const [msg, setMessage] = React.useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
		  event.stopPropagation();
		  setValidated(true);
		  return;
		}
		setLoading(true);
		setMessage([]);
		axios.post(URL+'/api/v1/track_paper_status', $("#frmTrack_Paper_Status").serialize()).then(res=>{
		
			setMessage(res['data']);
			setLoading(false);
			
		});
		
   };
   
   const listData=(json)=>{
	   var tr = [];
	   $.each(json, function(k,v){
		   tr.push(<tr>
			<td>{k}</td>
			<td>{v}</td>
		   </tr>);
	   });
	   return tr;
   };
   
   const getStatus=(sta)=>{
	   var className='primary';
	   var status = 'Pending to Review';
	   if(sta=='n'){
		   className = 'red';
		   status = 'Pending to Review';
	   }
	   if(sta=='A'){
		   className = 'info';
		   status = 'Accepted';
	   }
	   if(sta=='R'){
		   className = 'danger';
		   status = 'Rejected';
	   } 
	   if(sta=='P'){
		   className = 'success';
		   status = 'Published';
	   }
	   if(sta=='U'){
		   className = 'info';
		   status = 'Under Review';
	   }
	   if(sta=='V'){
		   className = 'info';
		   status = 'Revision';
	   }
	   if(sta=='F'){
		   className = 'dark';
		   status = 'Formalities Pending';
	   }
	   if(sta=='C'){
		   className = 'danger';
		   status = 'Cancelled';
	   } 
	   return <span className={`text-${className} font-weight-600`} >{status}</span>;
   };
   
   const firstLoadStatus=()=>{
	   const urlParams = new URLSearchParams(window.location.search);
	   const paperIndex = urlParams.get('pid');
	   
	   if(!paperIndex) return;
	   
	   setLoading(true);
	   setMessage([]);
	   var form = new FormData();
	   form.append('paperIndex', paperIndex);
	   axios.post(URL+'/api/v1/track_paper_status', form).then(res=>{
		
			setMessage(res['data']);
			setLoading(false);
			
		});
   };
   
   React.useEffect(()=>{
	   firstLoadStatus();
   },[]);
   
	return(
		<div>
			
			{msg && msg.status==0 && (<ReactBootstrap.Alert variant="danger" >
				{msg.message}
			</ReactBootstrap.Alert>)}
			
			{msg && msg.status==1 && (<table>
					<tbody>
						<tr>
							<td width="120" height="50" >Paper Index</td>
							<td><b>{msg.data.paper_index}</b></td>
						</tr>
						<tr>
							<td width="120" height="50" >Paper Title</td>
							<td><b>{msg.data.paper_title}</b></td>
						</tr>
						<tr>
							<td width="120" height="50" >Author Name</td>
							<td><b>{msg.data.author_name}</b></td>
						</tr>
						<tr>
							<td width="120" height="50" >Paper Status</td>
							<td style={styles.statusCss} >{getStatus(msg.data.status)}</td>
						</tr>
					</tbody>
				</table>)}
			
			{msg && !msg.status && (
			<ReactBootstrap.Form id="frmTrack_Paper_Status" noValidate action="" method="post" validated={validated} onSubmit={handleSubmit} >
				<div className="row" >
					<div className="col">
						<label className="font-weight-600 mb-10" >Paper Index</label>
						<input
							type="text"
							name="paperIndex"
							className="form-control form-control-md"
							placeholder="Your Paper Index"
							required
							autoFocus={true}
						/>
					</div>
				</div>
				
				<div className="row mt-3" >
					<div className="col-12">
						<div className="justify-content-end" >
							<button type="submit" className="btn btn-primary btn-block" disabled={loading} >
							{loading ? <React.Fragment>
								<div className="spinner-border text-white spinner-border-sm"></div> Please wait..
							</React.Fragment> : 'Track Status'}
							</button>
						</div>
					</div>
				</div>
				
			</ReactBootstrap.Form>
			)}
			
			{msg && msg.status && (<div><hr />
				<button className="btn btn-yellow" onClick={()=> setMessage([]) } >
					Reset
				</button>
			</div>)}
		</div>
	);
};
