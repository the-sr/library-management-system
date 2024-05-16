import { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/home/home.component";

const HomePage = () => {

    let [banner, setBanner] = useState();
    let [loading, setLoading] = useState(false);

    useEffect(() => { })

    return (
        <>
            <HeaderComponent />
        </>
    )
}

export default HomePage;
