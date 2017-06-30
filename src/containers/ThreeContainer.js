/* @flow */

// React
import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as AppActionCreators from '../actions/actions';

// Components
import ThreeView from '../components/ThreeView';
import LoaderModal from '../components/LoaderModal';

const skyboxTexture = 'Image-003.jpg';
const meshPath = 'parrot.js';


class ThreeContainer extends Component {

  componentDidMount(): void {

    this.props.loadMeshAction(meshPath);
    this.props.loadTextureAction(skyboxTexture);

  }
  render(): Object {
    const { mesh, texture } = this.props;
    if (mesh.progress === 'Complete' && texture.progress === 'Complete') {
      return(
        <ThreeView
          skyboxTexture={texture}
          mesh={mesh}
        />
      );
    } else {
      let progressStatus = 'Loading Mesh: ' + mesh.progress + ' | ' + ' Loading Texture: ' + texture.progress;
      return(
        <LoaderModal
          text={progressStatus}
          className="three-loader-dimmer"
          active={true}
          progress={progressStatus}
          progressColor={"#21ba45"}
        />);
    }
  }
}

function mapStateToProps(state: Object): Object {

  return {
    mesh: state.mesh,
    texture: state.texture,
  }

}

function mapActionCreatorsToProps(dispatch: Object) {

  return bindActionCreators(AppActionCreators, dispatch);

}

export default connect(mapStateToProps, mapActionCreatorsToProps)(ThreeContainer);
