import React from 'react';
import {useParams} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '../../common/Breadcrumbs';

export default function Product(props) {

    let {id} = useParams();

  return (
    <React.Fragment>
      <Breadcrumbs/>
        <p>This is Product</p>
    </React.Fragment>
  );
}