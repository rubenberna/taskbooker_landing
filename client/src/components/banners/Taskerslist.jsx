let React = require("react");
const TaskersList = ({ taskers }) => {
  return (
    <section className="banner-four">
      <div className="banner-four-wrapper-container">
        <div className="banner-four-wrapper-container-row">
          <h2 className="banner-four-wrapper-container-title">
           <div className="banner-four-wrapper-container-rating">
              <div className="banner-four-wrapper-container-rating-tasker-taskerwrapper">
                {taskers.map((tasker, i) =>
                  <div
                    key={tasker.id}
                    className="banner-four-wrapper-container-rating-tasker-columnlast"
                  >
                    <div className="banner-four-wrapper-container-rating-card-cardwrapper">
                      <div className="banner-four-wrapper-container-rating-card-cardcontainer">
                        <div className="banner-four-wrapper-container-rating-card-cardcontent">
                          <div className="banner-four-wrapper-container-rating-card-cardheaderwrapper banner-four-wrapper-container-rating-card-cardheaderborder">
                            <div className="banner-four-wrapper-container-rating-card-cardheaderwrapper-img">
                              <img
                                className="banner-four-wrapper-container-rating-card-cardheaderwrapper-image-cover"
                                src={
                                  tasker.avatar != null
                                    ? tasker.avatar.url
                                    : "https://i.pravatar.cc/150?u={tasker.id}"
                                }
                                alt={tasker.prettyName}
                              />
                            </div>
                            <div className="banner-four-wrapper-container-rating-cardratinginforow_description">
                              <h4 className="banner-four-wrapper-container-rating-card-headertext">
                                {tasker.prettyName}
                              </h4>
                              <div className="banner-four-singlestarrating-ratingcount">
                           {tasker.rating ==5 ? <div key={i} className="star-full" /> : tasker.rating >=1 ?<div  className="star-half" /> :  <div  className="star-empty"/> }
                               <span className="banner-four-singlestarrating-ratingcount-text">{tasker.rating}.0</span>
                               </div>
                              <p className="banner-four-wrapper-container-rating-ratinginforow_ratingvalue">

                              </p>
                              <p className="banner-four-wrapper-container-rating-ratinginforow_ratingvaluedescription">
                                {tasker.description != null ?  tasker.description.length >90 ? tasker.description.substring(0, 89) : tasker.description :""}
                              </p>
                            </div>
                          </div>
                          <div className="banner-four-wrapper-container-rating-taskerprogresscard">
                            <div className="banner-four-wrapper-container-rating-tasker_mytaskerwrapper">
                              <div
                                className="banner-four-wrapper-container-rating-ratinginforow_ratinginfo"
                                role="button"
                                tabindex="0"
                              >
                                <div className="banner-four-wrapper-container-rating-starrating_wrapperstars">
                                  <div className="banner-four-wrapper-container-rating-starrating-starempty" />
                                  <div className="banner-four-wrapper-container-rating-starrating-starempty" />
                                  <div className="banner-four-wrapper-container-rating-starrating-starempty" />
                                  <div className="banner-four-wrapper-container-rating-starrating-starempty" />
                                  <div className="banner-four-wrapper-container-rating-starrating-starempty" />
                                </div>
                                <div className="banner-four-wrapper-container-rating-cardratinginforow_description-price">
                                  <div className="banner-four-wrapper-container-rating-imagewrapper" />
                                  <p className="banner-four-wrapper-container-rating-ratinginforow_ratingvalue">
                                    Price/h
                                  </p>
                                  <p className="banner-four-wrapper-container-rating-ratinginforow_ratingvaluedescription">
                                  {tasker.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </h2>
        </div>
      </div>
    </section>
  );
};

module.exports = TaskersList;
