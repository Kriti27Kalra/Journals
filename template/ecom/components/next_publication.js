
const styles = {
	statusCss: {
		fontSize: '18px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
};
const NextPublication= (props) =>{
		

  const [startDate, setStartDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(true);

  const[rHour, setRHour] = React.useState(0); //countdown 2 hours.
  const[rMin, setRMin] = React.useState(0);
  const[rSec, setRSec] = React.useState(0);
  const[current_level, setCurrentLevel] = React.useState(3002);
  
  const[data, setData] = React.useState([]);
  
  const[rDays, setRDays] = React.useState(0);
  

  function getTime(){
		
		if((new Date(startDate)) > (new Date()))
		{
		  const total = Date.parse(startDate) - Date.parse(new Date());
		  const seconds = Math.floor( (total/1000) % 60 );
		  const minutes = Math.floor( (total/1000/60) % 60 );
		  const hours = Math.floor( (total/(1000*60*60)) % 24 );
		  const days = Math.floor( total/(1000*60*60*24) );
		 
		  setRDays(days);
		  setRHour(hours);
		  setRMin(minutes);
		  setRSec(seconds);
		}
	  
  }

  setInterval(function(){
    getTime()
  }, 1000);
  
  React.useEffect(()=>{
	  setLoading(true);
	  axios.get(`${URL}/api/v1/next_publication`).then(res=>{
		 if(res['data'].status=='1'){
			const rd = res['data'].data;
			const dt = `${rd.year}-${rd.month}-${rd.date} ${rd.hour}:${rd.minute} ${rd.ampm}`;
			setStartDate(new Date(dt));
			setData(rd);
		 }			 
		 setLoading(false);
	  });
  },[]);

  return(
    <div className="timer-container">
		{!loading && (<div className="numbers">
			<span className = "num-span">{("0" + rDays).slice(-2)}</span>
			<span className = "segment">days</span>
			<span className = "num-span">{("0" + rHour).slice(-2)}</span>
			<span className = "segment">hr</span>
			<span className = "num-span">{("0" + rMin).slice(-2)}</span>
			<span className = "segment">min</span>
			<span className = "num-span">{("0" + rSec).slice(-2)}</span>
			<span className = "segment">sec</span>
		</div>)}
		
		{loading && (<div>Loading..</div>)}
    </div>
  );
};
