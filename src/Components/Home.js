import axios from "axios"
import { useEffect, useState } from "react"
import "../Styles/Home.css"
import Loader from "./Loader"


export default function Home() {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchData = async () => {

            setIsLoading(true);
            const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "ZuiqAfJcuP5cjPD1ahC3lf8rx1NuYYxk",
                }
            })
            setData(results.data.data)
            console.log(results)
            setIsLoading(false)
        }
        fetchData()

    }, [])

    const outputGifs = () => {
        if (isLoading) {
            return <Loader />;
        } else {
            return data.map(d => {
                return (
                    <div key={d.id} className="gif">
                        <p className="lead text-muted py-3 text-dark">{d.title}</p>
                        <img src={d.images.fixed_height.url} />
                    </div>
                );
            });
        }

    };

    return (

        <div className="container gifs">
            {outputGifs()}
        </div>




    )
}

