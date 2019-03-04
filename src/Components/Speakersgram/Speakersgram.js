import React from "react";
import {FormControl, FormGroup, ControlLabel, Button, Col, Row,Grid,Image, Modal} from 'react-bootstrap';
import "./Speakersgram.css";
import html2canvas from 'html2canvas';
import logo from "../../images/Startup-San-Diego-Logo.png"
import FontSize from "./../FontSize";

class Speakersgram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            name: '',
            nameFS: 'red',
            jobTitle:'',
            titleFS: '12',
            company:'',
            companyFS:'12',
            image:null,
            discription: '',
            show: false,
            modal: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.download = this.download.bind(this);
        this.nameFont = this.nameFont.bind(this);
    }


    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })

    };

fileChangedHandler = (event) => {
    this.setState({
        image: URL.createObjectURL(event.target.files[0])
    })
}

handleClose() {
    this.setState({ show: false });
}

download(){
    window.open(this.state.modal)
}

nameFont(size){
    this.setState({ nameFS: size.target.value})
}

async handleShow () {
    let canvas = await html2canvas(document.getElementById("my-node")).then(function(canvas) {

        return canvas
    });
    this.setState({modal:canvas.toDataURL(), show: true});
}


render() {



    return (

        <Grid>
            <Row>
                <div className="banner_content"></div>

            </Row>
            <Row className= "row">

                <Col md={4}  >
                    <form>
                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl type="text" placeholder="Enter text" name= "title" onChange={this.handleChange} />

                        </FormGroup>

                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl type="text" placeholder="Enter text" name= "name" onChange={this.handleChange} />
                            <FontSize nameFont = {this.nameFont}/>
                        </FormGroup>

                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Job Title</ControlLabel>
                            <FormControl type="text" placeholder="Enter text" name= "jobTitle" onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Company</ControlLabel>
                            <FormControl type="text" placeholder="Enter text" name= "company" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Discription</ControlLabel>
                            <FormControl componentClass="textarea" type="text" placeholder="Enter text" name= "discription" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="">
                            <ControlLabel>Image</ControlLabel>
                            <FormControl type="file" name= "image" onChange={this.fileChangedHandler} />
                        </FormGroup>

                    </form>
                </Col>  

                <Col md={4} mdOffset={1} id="my-node" className="imageBox" >
                    <Image className="logo" src={logo} />
                    <h1 className="title">{this.state.title.toUpperCase()}</h1>
                    <h1 className="name" style={{color: this.state.nameFS}}>{this.state.name.toUpperCase()}</h1>
                    <h3 className="jobTitle">{this.state.jobTitle.charAt(0).toUpperCase() + this.state.jobTitle.slice(1)}{this.state.company ? ", " + this.state.company.charAt(0).toUpperCase() + this.state.company.slice(1) : ""}</h3>
                    <Image className="image"  src={this.state.image} />
                    <p className = "description">{this.state.discription}</p>

                    <p className="footer">#STARTUPSD #SDSW2019</p>

                </Col>

            </Row>

            <Row>
                <Col md={4}  mdOffset={2} id="my-node" >
                </Col>
                <Col md={4} id="my-node" >
                    <Button onClick={this.handleShow} bsStyle="warning">Preview</Button>
                </Col>

            </Row>
            <Row>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Speaker Gram</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Image className="canvas" rounded src={this.state.modal} />
                    </Modal.Body>
                    <Modal.Footer>

                        <Button><a href={this.state.modal} download={this.state.name}>Download</a></Button>
                    </Modal.Footer>
                </Modal>


            </Row>
        </Grid>
    );
}

}

export default Speakersgram;
