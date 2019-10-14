import React from 'react';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/styles';

const MyGrid = styled(Grid)({
    textAlign: 'center',
  });

function Comment(props) {
    return (
        <MyGrid item xs={12}>
            <h4>{props.comment.commentator}</h4>
            <p>{props.comment.comment}</p>
        </MyGrid>
    );
  }

  export default Comment;