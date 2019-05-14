import React from 'react';
import Navbar from '../components/Navbar/Navbar'
import Task from '../components/Cards/Task';
import API from '../utils/API';
import {Container, Row, Col} from '../components/grid/grid';
import { Redirect } from 'react-router-dom';
// import { stringify } from 'querystring';

class Search extends React.Component {
  state = {
    redirect: false,
    jobSearch: "",
    jobs: [],
    type: ''
  };

  componentDidMount(){  
   this.loadJobs();
   this.restrictPage();
  }

  // componentDidUpdate(){
  //   this.loadJobType();
  // }

  //prevents unauthorized users to acces page
  restrictPage = () => {
    API.getUsers()
    .then(response => {
      console.log(response);
      if (response.data === "no user") {
        //load page
        this.setState({ redirect: true })
      }
    });
  // API.getUsers()
  // .then((req, res) => {
  //     console.log(req);
  //     console.log(req.user);
  //     if (req.data !== "no user") {
  //       //load page
  //       res.json("/login", req.data);
  //     } else {
  //       this.setState({ redirect: true })
  //     }
  //   })
  //   .catch(err => console.log(err));
  };

  loadJobType = (type) => {
    API.getJobByType(type)
      .then(res => this.setState({ jobs: res.data }))
      .catch(err => console.log(err));
  }
  //automatically createa card for each job posted
  loadJobs = () => {
    API.getJobs()
      .then(res => this.setState({ jobs: res.data }, () => console.log("new data:", this.state.jobs)))
      .catch(err => console.log(err));
  };

  loadUser = () => {
    API.getUserById()
      .then(res => this.setState({user: res.data}))
      .catch(err => console.log(err));
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.loadJobType(this.state.type);
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };


  render(){
    if (this.state.redirect) {
      return <Redirect to="/" />
    } else {
      return (
        <div>
          <Navbar/>
          <div class="jumbotron">
          <Container fluid>
        <Row fluid>
          <Col col-md-12>
            <div className="mb-3">
              <p>Search for Jobs</p>
              <Row>
                <Col col-md-12>
               
                  <select name="type" onChange={this.handleInputChange}>
                      <option value="" disabled selected>Select your option</option>
                      <option value="Housework">Housework</option>
                      <option value="Yardwork">Yardwork</option>
                      <option value="Furniture Assembly">Furniture Assembly</option>
                      <option value="Tutoring">Tutoring</option>
                      <option value="Pet Care">Pet Care</option>
                      <option value="IT">IT</option>
                      <option value="Misc">Misc</option>


                    </select>
                    <button onClick={this.handleSearch}>
                      Search
                    </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        </Container>
        </div>
        <div className="jumbotron">
        <Row>
          <Col col-md-12>
            <div className="p-3">
              <p>Results</p>
              <Row>
                <Col col-md-4>
                  <div className="p-3">
                      {this.state.jobs.map(job => {
                        return (
                          <Task
                            key={job.title}
                            _id={job._id}
                            title={job.title}
                            zipcode={job.zipcode}
                            description={job.description}
                            date={job.date}
                            payRate={job.payRate}
                          />
                        );
                      })}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        </div>
      </div>

      
      )
    }
  }

}
export default Search;
