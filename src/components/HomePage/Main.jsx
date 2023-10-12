import React from "react";
import Header from "../Header/Header";
import Home from "./Home";
import Footer from "../Footer/footer";
const MainPage=()=>{
    return(
        <div className="main-page">
            <Header />
            <Home />
            <Footer />
        </div>
    )
}
export default MainPage;