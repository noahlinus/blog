import React from 'react';
import styled from 'styled-components'

const SkeletonConfigTypes = [
  { width: 300, height: 20, margin: 12 },
  { width: 500, height: 16, margin: 8 },
  { width: 500, height: 16, margin: 8 },
  { width: 500, height: 16, margin: 8 },
  { width: 400, height: 16, margin: 8 },
]

const Skeleton = () => (
  <div>
    {
      SkeletonConfigTypes.map((item, index) => (
        <SkeletonContent
          key={`${index}`}
          style={{
            width: item.width + 'px',
            height: item.height + 'px',
            margin: `${item.margin}px 0`,
          }} />
      ))
    }

  </div>
)

const SkeletonContent = styled.div`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  /* background-size: 800px 104px; */
  height: 20px;
  position: relative;
  opacity:0.6;
  background-size: 460px 104px;

  @keyframes placeHolderShimmer{
    0%{
      background-position: -500px 0
    }
    100%{
      background-position: 500px 0
    }
  }
`
export default Skeleton
