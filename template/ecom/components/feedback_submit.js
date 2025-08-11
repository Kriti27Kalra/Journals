

const FeedbackSubmit= () =>{
	
	const [loading, setLoading] = React.useState(false);
	const [validated, setValidated] = React.useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
		  event.stopPropagation();
		  setValidated(true);
		  return;
		}
		setLoading(true);
		axios.post(URL+'/api/v1/save_feedback', $("#frm_rfeedback_new").serialize()).then(res=>{
			if(res['data'].status=='1'){
				document.getElementById("frm_rfeedback_new").reset();
			}
			alert(res['data'].message);
			setLoading(false);
		});
		
   };
  
	return(
		<div>
			
			<ReactBootstrap.Form id="frm_rfeedback_new" noValidate action="" method="post" validated={validated} onSubmit={handleSubmit} >
				<div className="row" >
					<div className="col">
						<label className="font-weight-600" >Your Name</label>
						<input
							type="text"
							name="name"
							className="form-control "
							required
							autoFocus={true}
						/>
					</div>
				</div>
				
				<div className="row mt-3" >
					<div className="col">
						<label className="font-weight-600" >Your Email</label>
						<input
							type="email"
							name="email"
							className="form-control "
							required
						/>
					</div>
				</div>
				
				{/*<div className="row mt-3" >
					<div className="col">
						<label className="font-weight-600" >Your Phone No</label>
						<input
							type="text"
							name="phone"
							className="form-control "
							required
						/>
					</div>
				</div>
				
				<div className="row mt-3" >
					<div className="col">
						<label className="font-weight-600" >Subject</label>
						<input
							type="text"
							name="subject"
							className="form-control "
							required
						/>
					</div>
				</div>*/}
				
				<div className="row mt-3" >
					<div className="col">
						<label className="font-weight-600" >Your Comment</label>
						<textarea name="message" className="form-control " required rows="6" >
						</textarea>
					</div>
				</div>
				
				<div className="row mt-3" >
					<div className="col-md-12">
						<div className="d-flex justify-content-end" >
							<button type="submit" className="btn btn-primary btn-block" disabled={loading} >
								{loading ? <React.Fragment>
									<div className="spinner-border text-white spinner-border-sm"></div> Please wait..
								</React.Fragment> : 'Submit Comment'}
							</button>
						</div>
					</div>
				</div>
				
			</ReactBootstrap.Form>
		</div>
	);
};
