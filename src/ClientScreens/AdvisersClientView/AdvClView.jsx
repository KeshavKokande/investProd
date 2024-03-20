
import AdvisorsCarousel from "./AdvisorsCarousel";
import advidata from "./advi.json";
import "../Plans/Plans.css";

function AdvClView(){
    return(
        <div>
            <AdvisorsCarousel advisors={advidata.listOfNamesOfAdvisors} />
        </div>
    );
}

export default AdvClView;