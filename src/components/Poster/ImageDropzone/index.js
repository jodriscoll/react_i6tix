import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

class ImageDropzone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropzoneActive: false
        }
    }

    onDragEnter() {
        this.setState({
            dropzoneActive: true
        });
    }

    onDragLeave() {
        this.setState({
            dropzoneActive: false
        });
    }

    onDrop(files) {
        this.props.handleDroppedFile(files[0], this.props.src, this.props.frame);
        this.setState({
            dropzoneActive: false
        });
    }

    render() {

        const { dropzoneActive } = this.state;

        const overlayStyle = {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(255,255,255,.7)',
            borderRadius: '15px',
            fontSize: '1.5em',
            zIndex: '50',
            transform: `rotate(${this.props.rotate}deg)`
        };

        const titleStyle = {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
            textAlign: 'center'
        };

        return (
            <Dropzone
                disableClick
                style={{position: 'relative',height:this.props.height,width:this.props.width}}
                onDrop={this.onDrop.bind(this)}
                onDragEnter={this.onDragEnter.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
            >
                {
                    dropzoneActive &&
                    <div style={overlayStyle}>
                        <div style={titleStyle}>Drop photo here...</div>
                    </div>
                }
                { this.props.children}
            </Dropzone>
        );

    }

}

ImageDropzone.propTypes = {
    handleDroppedFile: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
    rotate: PropTypes.number,
    src: PropTypes.object,
    frame: PropTypes.number,
    children: PropTypes.object,
};

export default ImageDropzone;
