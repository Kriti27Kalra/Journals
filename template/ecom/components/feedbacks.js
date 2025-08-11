const Feedbacks= (props) =>{
	
	const [loading, setLoading] = React.useState(false);
	const [show, setShow] = React.useState(false);
	const [page, setPage] = React.useState(1);
	const [data, setData] = React.useState([]);
	
	const loadData=()=>{
		setLoading(true);
		axios.get(`${URL}/api/v1/feedbacks?page=${page}`).then(res=>{
			if(res['data'].status=='1'){
				var d = data;
				d.push(...res['data'].data);
				setData(d);
				setPage(res['data'].page);
			}
			setLoading(false);			
		});
	};
	
	React.useEffect(()=>{
		
		loadData();
	},[]);
	
	
	function timeSince(date) {

	  var seconds = Math.floor((new Date() - date) / 1000);

	  var interval = seconds / 31536000;

	  if (interval > 1) {
		return Math.floor(interval) + " years";
	  }
	  interval = seconds / 2592000;
	  if (interval > 1) {
		return Math.floor(interval) + " months";
	  }
	  interval = seconds / 86400;
	  if (interval > 1) {
		return Math.floor(interval) + " days";
	  }
	  interval = seconds / 3600;
	  if (interval > 1) {
		return Math.floor(interval) + " hours";
	  }
	  interval = seconds / 60;
	  if (interval > 1) {
		return Math.floor(interval) + " minutes";
	  }
	  return Math.floor(seconds) + " seconds";
	}

	return(
		<div>
			
			<ReactBootstrap.Card>
				<ReactBootstrap.Card.Header style={{cursor: 'pointer'}} onClick={ e => setShow(!show)} >
					SUBMIT YOUR FEEDBACK
					<span className="float-end">
					{show ? <i className="icofont-rounded-up"></i> : <i className="icofont-rounded-down"></i>}
					</span>
				</ReactBootstrap.Card.Header>
				<ReactBootstrap.Collapse in={show} >
					 <div id="example-collapse-text">
					<ReactBootstrap.Card.Body>
						<FeedbackSubmit />
					</ReactBootstrap.Card.Body>
					</div>
				</ReactBootstrap.Collapse >
			</ReactBootstrap.Card>
			
		{data.map((item,i)=>{
				 return <div className="card p-3 mt-15 bg-light">
					<div className="d-flex justify-content-between align-items-center border-bottom">
						<div className="user d-flex flex-row  "> 
							<img src={`${URL}/public/gravatar.png`} width="30" className="user-img rounded-circle mr-2" /> 
							<div><small className="font-weight-bold text-primary ps-3">{item.comment_author}</small> </div>
						</div> 
							<small>{timeSince(new Date(item.comment_date))} ago</small>
					</div>
					 <div className="d-flex justify-content-between align-items-center">
						<div className="user d-flex flex-row "> 						
							<div className="font-weight-bold font-13">{item.comment_content}</div>
						</div> 
						
					</div>
				</div>;
		})}
			
			{!loading && (<div className="text-center mt-15">
				<a className="btn btn-primary" href="javascript:;" onClick={e=> loadData()} >
					Load More Comments
				</a>
			</div>)}
			
			{loading && (<center>
				<div className="lds-ellipsis">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</center>)}
			
		</div>
	);
};
