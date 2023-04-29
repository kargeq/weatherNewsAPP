/**
 * 
 * @returns validation error of no location being found
 * @description inspired by   //https://frontendshape.com/post/bootstrap-5-404-page-examples
 */
const LocationNotFound = () => {


  return (
    <div className="d-flex align-items-center justify-content-center vh-30">
      <div className="text-center row">
        <div className=" col-md-6">
          <img
            src="https://d.newsweek.com/en/full/2096815/astronaut-spaceman-do-spacewalk.webp?w=1400&f=e567216d0940dbc3b3556605d7dc4ecb"
            alt=""
            className="img-fluid"
            style={{ marginRight: "-20rem", borderRadius: "1.2rem" }}
          />
        </div>
        <div className=" col-md-6 mt-5">
          <p style={{marginLeft:"10rem"}} className="fs-3">
            {" "}
            <span class="text-danger">Oops!</span> Location not found.
          </p>
          <p style={{marginLeft:"10rem"}}className="lead">
            The Location you’re looking for doesn’t exist. Please ensure that
            you have entered the correct information properly and that the
            location is in the world (specifically in the US)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationNotFound;
