import { useEffect, useState } from "react"

function  Weather(){
const [city,setCity]=useState("");
const [dataArr,setDataArr]=useState();
const [loading,setLoading]=useState(false);
    function hanldeSubmit(e){
        e.preventDefault();
        setLoading(true);
const city=e.target.city.value;
setCity((c)=>city);
    }

    useEffect(()=>{


    const apiKey = '87dbe6adbf264a3a87f102944241006';
  const location = city;
        async function getCityData(){
            if(city){
                try{
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
              }, 2000);
            const req=await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
            const res=await req.json();
            console.log(res)
            const pre=res.current;
            const obj={
                temperature:pre?.temp_c +"°C",
                humidity:pre.humidity+"%",
                condition:pre.condition.text,
                wind:pre.wind_kph+"kph",
            }
            console.log(obj)
            setDataArr((c)=>obj);
            console.log(Object.entries(obj));
        }catch(error){
            alert("Failed to fetch weather data")
            setDataArr();
        }
        }
    }
        getCityData()
    },[city])
return (<div className="w-screen h-screen bg-blue-300">
    <form 
    onSubmit={(e)=>hanldeSubmit(e)}
    className="flex justify-center items-center gap-4  w-auto pt-16">
        <input
        name="city"
        className="h-[28px] border-none rounded-sm placeholder:text-gray-500"
        type="text" placeholder="Enter city name"></input>
        <button
        className="flex justify-center items-center mr-2 text-white bg-green-600 h-[34px] w-[80px] rounded-md"
        type="submit">Search</button>
    </form>
    <div className="weather-cards w-[100%] h-[200px] border-2 border-black flex justify-around items-center gap-2">
    {
        loading ? <Loading /> :
        (dataArr && Object.entries(dataArr).map((val, index) => {
          return <Pills key={index} value={val} />
        }))
      }
</div>
</div>)
}

function Pills({value}){
    console.log(value)
    return <div className= "weather-card bg-white  rounded-md justify-center items-center h-[100px] flex flex-col w-[150px]">
        <h2
        className="font-semibold text-lg capitalize"
        >{value[0]}</h2>
        <h5>{value[1]}</h5>

    </div>
}

function Loading() {
    return (
        <p className="loader">Loading data...</p>
    );
  }

export {Weather}