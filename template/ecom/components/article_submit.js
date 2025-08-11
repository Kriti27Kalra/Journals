

const ArticleSubmit= () =>{
	
	const [loading, setLoading] = React.useState(false);
	const [multipleAuthor, setMultipleAuthor] = React.useState(false);
	const [validated, setValidated] = React.useState(false);
	const [authors, setAuthors] = React.useState([]);
	
	const [journals, setJournals] = React.useState([]);
	const [countries, setCountries] = React.useState([]);
	const [states, setStates] = React.useState([]);
	
	const [successData, setSuccessData] = React.useState([]);
	const [showSuccess, setShowSuccess] = React.useState(false);
	
	React.useEffect(()=>{
			
		setAuthors(...authors, [{name: ''}]);
		loadJournals();
	},[]);
	
	const loadJournals=()=>{
		setLoading(true);
		axios.get('api/v1/list_journals').then(res=>{
			if(res['data'].status=='1'){
				
				setJournals(res['data'].data);
			}
			setLoading(false);
		});
		setLoading(true);
		axios.get('api/v1/country_states?type=country').then(res=>{
			if(res['data'].status=='1'){
				
				setCountries(res['data'].data);
			}
			setLoading(false);
		});
	};
	
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
		  event.stopPropagation();
		  setValidated(true);
		  return;
		}
		const formdata = new FormData(form);
		setLoading(true);
		axios.post('api/v1/save_article', formdata).then(res=>{
			if(res['data'].status=='1'){
				document.getElementById("frm_r_submit_my_article").reset();
				setSuccessData(res['data']);
				setShowSuccess(true);
			}
			else{
				alert(res['data'].message);
			}
			setLoading(false);
		});
		
   };
  
	  const addAuthors=()=>{
		  let au = authors;
		  if(au.length>9){
			  alert('You are allowed to add 10 authors only');
			  return;
		  }
		  setAuthors([...authors, {name: ''}]);
	  };
	  
	  
	  const removeItem = (items, i) => items.slice(0, i-1).concat(items.slice(i, items.length));
  
	  const removeAuthor=(index)=>{
		  let ar = authors;
		  
		  var s = removeItem(ar, index);
		  
		  setAuthors(s);
	  };
	  
	const authorNameChange=(index, e)=>{
		var s = authors;
		s[index]['name'] = e.target.value;
		
		setAuthors([...authors, s]);
	};
	
	const handleCountryChange=(e)=>{
		let cid = countries.filter(item => item.name==e.target.value);
		if(cid.length<1) return;
		axios.get('api/v1/country_states?type=state&country='+cid[0].id).then(res=>{
			if(res['data'].status=='1'){
				
				setStates(res['data'].data);
			}
			setLoading(false);
		});
		
	};
	
	return(
		<div>
			
			<ReactBootstrap.Form id="frm_r_submit_my_article" noValidate action="" method="post" validated={validated} onSubmit={handleSubmit} >
			
				
				{/*<div className="row">
				<div className="col">
						<table className="table">
						{authors && authors.length>0 && (authors.map((item,i)=>{
							console.log(item);
							return <tr key={i}>
								<td>
									<label className="font-weight-600" >Author Name</label>
									<input
										type="text"
										className="form-control"
										name="author[]"
										onChange={(e)=> authorNameChange(i, e) }
										value={item.name}
										required
									/>
								</td>
								<td width="40">
								{i!=0 && (<button type="button" className="btn  btn-danger btn-sm bg-danger" style={{marginTop: '38px'}} onClick={()=> removeAuthor(i) } >
										<i className="fa fa-times"></i>
								</button>)}
								</td>
							</tr>;
						}))
						}
						<tr>
							<td>
								<a href="javascript:;" className="font-13" onClick={()=> addAuthors() } >
									<i className="fa fa-plus"></i> Add Author
								</a>
							</td>
						</tr>
						</table>
					</div>
				</div>*/}
				
				<div className="row mt-3" >
					<div className="col">
						<label className="font-weight-600" >Author Name <span className="text-danger">*</span></label>
						<input
							type="text"
							name="author_name_1"
							className="form-control text-uppercase"
							required
						/>
					</div>
				</div>
				
				<div className="row mt-3" >
					<div className="col">
						<label className="font-weight-600" >Your Paper Title <span className="text-danger">*</span></label>
						<input
							type="text"
							name="paper_title"
							className="form-control text-uppercase"
							required
						/>
					</div>
				</div>
				
				<div className="row mt-3" >
					<div className="col">
						<label className="font-weight-600" >Name of the Journal</label>
						<select name="journal" className="form-control " required >
							<option value=""> Select Your Journal </option>
							{journals && journals.length>0 && (journals.map((item,i)=>{
								return <option value={item.id} key={i} > {item.name} </option>;
							}))
							}
						</select>
					</div>
				</div>
				
				<div className="row mt-3" >
					<div className="col-md-4">
						<label className="font-weight-600" >Date of Birth</label>
						<input
							type="date"
							name="dob"
							className="form-control "
							required
						/>
					</div>
					
					<div className="col-md-4">
						<label className="font-weight-600" >Mobile</label>
						<input
							type="number"
							name="mobile"
							className="form-control "
							required
						/>
					</div>
					
					<div className="col-md-4">
						<label className="font-weight-600" >Email</label>
						<input
							type="email"
							name="email"
							className="form-control "
							required
						/>
					</div>
				</div>
				
				<div className="row mt-3" >					
					<div className="col-md-6">
						<label className="font-weight-600" >Designation</label>
						<input
							type="text"
							name="designation"
							className="form-control "
							required
						/>
					</div>
					
					<div className="col-md-6">
						<label className="font-weight-600" >Department</label>
						<input
							type="text"
							name="department"
							className="form-control "
							required
						/>
					</div>
				</div>
				
				<div className="row mt-3" >					
					<div className="col-md-6">
						<label className="font-weight-600" >College / University</label>
						<input
							type="text"
							name="college"
							className="form-control "
							required
						/>
					</div>
					
					<div className="col-md-6">
						<label className="font-weight-600" >Institution Place</label>
						<input
							type="text"
							name="institutionplace"
							className="form-control "
							required
						/>
					</div>
				</div>
				
				<div className="row mt-3" >					
					<div className="col-md-6">
						<label className="font-weight-600" >Country</label>
						<select
							name="country"
							className="form-control "
							required
							onChange={handleCountryChange}
						>
							<option value=""> Select </option>
							{countries.map( item => <option value={item.name} > {item.name} </option>)}
						</select>
					</div>
					
					<div className="col-md-6">
						<label className="font-weight-600" >State</label>
						<select
							name="state"
							className="form-control "
							required
						>
							<option value=""> Select </option>
							{states.map( item => <option value={item.name} > {item.name} </option>)}
						</select>
					</div>
				</div>
			
				<div className="row mt-3" >
					<div className="col">
						<label className="font-weight-600" >Upload File (Upload MS Word file only)</label>
						<input type="file" name="article"  accept=".doc,.docx" className="form-control" required />
					</div>
				</div>
				
				{/*<div className="row mt-3" >
					<div className="col">
						<label className="font-weight-600" >Message</label>
						<textarea name="message" className="form-control " required rows="5" >
						</textarea>
					</div>
				</div>*/}
				
				<input type="hidden" name="message" value="Message" />
				
				<div className="row mt-3" >
					<div className="col-md-12">
						<div className="d-flex justify-content-end" >
							<button type="submit" className="btn btn-primary btn-block" disabled={loading} >
								{loading ? <React.Fragment>
									<div className="spinner-border text-white spinner-border-sm"></div> Please wait..
								</React.Fragment> : 'Submit Contact'}
							</button>
						</div>
					</div>
				</div>
				
			</ReactBootstrap.Form>
			
			<ReactBootstrap.Modal show={showSuccess} onHide={()=>{
				setShowSuccess(false);
				setSuccessData([]);
			}} 
			backdrop="static"
			>
				<ReactBootstrap.Modal.Header closeButton >
					Success
				</ReactBootstrap.Modal.Header>
				<ReactBootstrap.Modal.Body>
					<ReactBootstrap.Alert variant="success" >
						{successData.message}
					</ReactBootstrap.Alert>
						Your Paper Index is : <b>{successData.data}</b>
						<br /><br />
				</ReactBootstrap.Modal.Body>
			</ReactBootstrap.Modal>
		</div>
	);
};
