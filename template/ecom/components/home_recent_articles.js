

const HomeRecentArticles= () =>{
	
	const [loading, setLoading] = React.useState(true);
	const [data, setData] = React.useState([]);
	
	const loadData=()=>{
		setLoading(true);
		axios.post('api/v1/recent_articles').then(res=>{
			if(res['data'].status=='1'){
				console.log(res['data'].data);
				setData(res['data'].data);
				setLoading(false);
			}
		});
	};
	
	React.useEffect(()=>{
		
		loadData();
	},[]);
	
	const showList=(item)=>{
		
		return <a href={`${item.short_code}/article/${item.id}`} key={item.id} >
			<div className="list-group-item list-group-item-action d-flex align-items-center">
				
					<div className="width-90 height-90 d-flex align-items-center justify-content-center ms-n1">
					  <img src={`${URL}/template/ecom/assets/img/bf.jpg`} className="ms-100 mh-100 rounded" />
					</div>
					<div className="flex-fill ps-3 pe-3">
						<div className="font-weight-600">{item.paper_index}</div>
						<div className="font-13 " >{item.title}</div>
					</div>
			</div>
		</a>;
	};
	
	return(
		<div className="card" >
			<div className="card-body">
				<h5 className="card-title">Recent Articles</h5>
				<div className="card-text" style={{height:'400px', overflow:'auto' }} >
					<div className="list-group">
						{loading && (<center className="pt-100" ><div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div></center>)}

						{data && data.length>0 && (data.map((item,i) => showList(item) ))}						
					</div>
				</div>
			</div>
		</div>
	);
};
