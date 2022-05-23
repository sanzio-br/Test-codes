// import bgImage from "./Kalbo-Adventures-Karuru-Experience-2021-37.jpg"
export default function Home({isAuth}) {
    return (
        <section className="banner_main">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-bg">
                            <div className="padding_lert">
                                <h1 data-aos="fade-down">
                                    WELCOME TO KALBO ADVENTURE
                                </h1>
                                <span data-aos="fade-down">
                                    ADMIN PAGE
                                </span>
                                <p data-aos="fade-right">
                                    This is the page where you post events and blogs for the kalbo adventures client website. please sign in using the button below for the create post and post event buttons to appear
                                </p>
                                {!isAuth ? (
                                <a href="/login" data-aos="fade-up">Sign in</a>
                                ) : (<></>)
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </section>
    )
}