
const styles = {
	statusCss: {
		fontSize: '18px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
};
const OurJournalsTop = (props) =>{
		
	const [loading, setLoading] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [viewData, setViewData] = React.useState([]);
	const [show, setShow] = React.useState(false);

	const loadData = () => {
		
		setLoading(true);

		axios.get(URL+'/api/v1/list_journals').then(res=>{
		
			setData(res['data'].data);
			setViewData(res['data'].data);
			setLoading(false);
			
		});
		
   };
   
   const handleSearch=(e)=>{
		var m = data.filter(item => item.name.toUpperCase().indexOf(e.target.value.toUpperCase())>-1);
		setViewData(m);	 
   };
   
   React.useEffect(()=>{
	   loadData();
   },[]);
   
	return(
		<React.Fragment>
			<li className="nav-item">
				<a href="javascript:;" className="nav-link" onClick={()=> setShow(true)} >
					Our Journals
					<i className="fa fa-chevron-down ps-2 pt-2"></i>
				</a>	
			</li>
			
			<ReactBootstrap.Modal show={show} onHide={()=> setShow(false)} backdrop="static" size="lg" >
				<ReactBootstrap.Modal.Header closeButton >
					Our Journals
				</ReactBootstrap.Modal.Header>
				<ReactBootstrap.Modal.Body>
				
				{loading && (<center className="mt-4 mb-4" >
					<ReactBootstrap.Spinner animation="border" />
				</center>)}
				
				{data && data.length>0 && (<div className="mb-5" >
					<input type="text" className="form-control form-control-md" placeholder="Search by Journal Name.." onChange={ e => handleSearch(e) } />
				</div>)}
				
					<ul className="list-group">
					{viewData && viewData.length>0 && (viewData.map((item,i)=>{
						return <li key={i} className="list-group-item py-10">
							<img src={URL+'/public/'+item.home_page_wrapper} style={{width: '80px', height: '80px', marginRight: '15px'}} />
							<a href={`${URL}/${item.short_code}`} >
								{item.name}
								<span className="float-end" >
									<i className="fa fa-chevron-right"></i>
								</span>
							</a>
						</li>;
					}))}
					</ul>
				</ReactBootstrap.Modal.Body>
			</ReactBootstrap.Modal >
		</React.Fragment>
	);
};
