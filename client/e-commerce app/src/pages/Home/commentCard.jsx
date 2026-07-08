import React, { useEffect, useState } from 'react'

function CommentCard({ comments }) {

   return (
      <>
         {
            comments.map((comment) => {
               return (
                  <div key={comment.id} className='comment-card'>
                     <div className='inverted-commas'>
                        <p>“</p>
                     </div>
                     <div className='person-name'>
                        <p>{comment.name}</p>
                     </div>
                     <div className='comment'>
                        <p>{comment.comment}</p>
                     </div>
                  </div>
               )
            })
         }
      </>
   )
}

export default CommentCard