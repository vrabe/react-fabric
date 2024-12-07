import { useState } from "react"
import { ReactFabric, BackgroundImage, Rect } from "react-fabric2"

const rects=[
  {

      "id": "9503CC005F714CA4JX70K7yY",
      "question_num": 1,
      "raw": "0,842,1653,842,1653,1757,0,1757",
      
      "defaultLeft": 0,
      "defaultTop": 728.6053869174862,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 790.7742625053443,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          0,
          728.6053869174862,
          1430.3856348867039,
          728.6053869174862,
          1430.3856348867039,
          1520.3796494228304,
          0,
          1520.3796494228304
      ],
      "id": "9503CC005F714CA4JX70K7yY-1--sqs-0",
      "raw": "0,842,1653,842,1653,1757,0,1757",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 0,
      "defaultTop": 728.6053869174862,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 790.7742625053443,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          0,
          728.6053869174862,
          1430.3856348867039,
          728.6053869174862,
          1430.3856348867039,
          1520.3796494228304,
          0,
          1520.3796494228304
      ],
      "id": "9503CC005F714CA4JX70K7yY-1--sqs-1",
      "raw": "0,842,1653,842,1653,1757,0,1757",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 0,
      "defaultTop": 728.6053869174862,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 790.7742625053443,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          0,
          1520.3796494228304,
          1430.3856348867039,
          1520.3796494228304,
          1430.3856348867039,
          1931.4100042753314,
          0,
          1931.4100042753314
      ],
      "id": "71D0740EECB34240y57807BR",
      "question_num": 2,
      "raw": "0,1757,1653,1757,1653,2232,0,2232",
      
      "defaultLeft": 0,
      "defaultTop": 1520.3796494228304,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 410.030354852501,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          0,
          1520.3796494228304,
          1430.3856348867039,
          1520.3796494228304,
          1430.3856348867039,
          1931.4100042753314,
          0,
          1931.4100042753314
      ],
      "id": "71D0740EECB34240y57807BR-2--sqs-0",
      "raw": "0,1757,1653,1757,1653,2232,0,2232",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 0,
      "defaultTop": 1520.3796494228304,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 410.030354852501,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          1430.3856348867039,
          135.8563488670372,
          2860.7712697734078,
          135.8563488670372,
          2860.7712697734078,
          1021.9512612227448,
          1430.3856348867039,
          1021.9512612227448
      ],
      "id": "71D0740EECB34240y57807BR",
      "question_num": 3,
      "raw": "1653,157,3306,157,3306,1181,1653,1181",
      
      "defaultLeft": 1430.3856348867039,
      "defaultTop": 135.8563488670372,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 885.0949123557076,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          1430.3856348867039,
          135.8563488670372,
          2860.7712697734078,
          135.8563488670372,
          2860.7712697734078,
          1021.9512612227448,
          1430.3856348867039,
          1021.9512612227448
      ],
      "id": "71D0740EECB34240y57807BR-3--sqs-0",
      "raw": "1653,157,3306,157,3306,1181,1653,1181",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 1430.3856348867039,
      "defaultTop": 135.8563488670372,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 885.0949123557076,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          1430.3856348867039,
          135.8563488670372,
          2860.7712697734078,
          135.8563488670372,
          2860.7712697734078,
          1021.9512612227448,
          1430.3856348867039,
          1021.9512612227448
      ],
      "id": "71D0740EECB34240y57807BR-3--sqs-1",
      "raw": "1653,157,3306,157,3306,1181,1653,1181",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 1430.3856348867039,
      "defaultTop": 135.8563488670372,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 885.0949123557076,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          1430.3856348867039,
          135.8563488670372,
          2860.7712697734078,
          135.8563488670372,
          2860.7712697734078,
          1021.9512612227448,
          1430.3856348867039,
          1021.9512612227448
      ],
      "id": "71D0740EECB34240y57807BR-3--sqs-2",
      "raw": "1653,157,3306,157,3306,1181,1653,1181",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 1430.3856348867039,
      "defaultTop": 135.8563488670372,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 885.0949123557076,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          1430.3856348867039,
          135.8563488670372,
          2860.7712697734078,
          135.8563488670372,
          2860.7712697734078,
          1021.9512612227448,
          1430.3856348867039,
          1021.9512612227448
      ],
      "id": "71D0740EECB34240y57807BR-3--sqs-3",
      "raw": "1653,157,3306,157,3306,1181,1653,1181",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 1430.3856348867039,
      "defaultTop": 135.8563488670372,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 885.0949123557076,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          1430.3856348867039,
          1021.9512612227448,
          2860.7712697734078,
          1021.9512612227448,
          2860.7712697734078,
          1931.4100042753314,
          1430.3856348867039,
          1931.4100042753314
      ],
      "id": "CEE5B03A0EE84D7672AWX760",
      "question_num": 4,
      "raw": "1653,1181,3306,1181,3306,2232,1653,2232",
      
      "defaultLeft": 1430.3856348867039,
      "defaultTop": 1021.9512612227448,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 908.4587430525866,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          1430.3856348867039,
          1493.5545104745618,
          2860.7712697734078,
          1493.5545104745618,
          2860.7712697734078,
          1744.4993587002994,
          1430.3856348867039,
          1744.4993587002994
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-0",
      "raw": "1653,1726,3306,1726,3306,2016,1653,2016",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 1430.3856348867039,
      "defaultTop": 1493.5545104745618,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 249.9448482257376,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "raw": "1874,1781,1916,1781,1916,1807,1874,1807",
      "points": [
          1603.451047456178,
          1529.8982471141514,
          1676.1385207353571,
          1529.8982471141514,
          1676.1385207353571,
          1574.8952543822147,
          1603.451047456178,
          1574.8952543822147
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-0-0",
      
      "defaultLeft": 1603.451047456178,
      "defaultTop": 1529.8982471141514,
      "defaultWidth": 71.68747327917913,
      "defaultHeight": 43.99700726806327,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "raw": "1874,1843,1916,1843,1916,1869,1874,1869",
      "points": [
          1603.451047456178,
          1583.5485250106883,
          1676.1385207353571,
          1583.5485250106883,
          1676.1385207353571,
          1628.5455322787516,
          1603.451047456178,
          1628.5455322787516
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-0-1",
      
      "defaultLeft": 1603.451047456178,
      "defaultTop": 1583.5485250106883,
      "defaultWidth": 71.68747327917913,
      "defaultHeight": 43.99700726806327,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "raw": "1874,1904,1916,1904,1916,1930,1874,1930",
      "points": [
          1603.451047456178,
          1636.333475844378,
          1676.1385207353571,
          1636.333475844378,
          1676.1385207353571,
          1681.3304831124412,
          1603.451047456178,
          1681.3304831124412
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-0-2",
      
      "defaultLeft": 1603.451047456178,
      "defaultTop": 1636.333475844378,
      "defaultWidth": 71.68747327917913,
      "defaultHeight": 43.99700726806327,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "raw": "1874,1965,1916,1965,1916,1991,1874,1991",
      "points": [
          1603.451047456178,
          1689.1184266780676,
          1676.1385207353571,
          1689.1184266780676,
          1676.1385207353571,
          1734.115433946131,
          1603.451047456178,
          1734.115433946131
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-0-3",
      
      "defaultLeft": 1603.451047456178,
      "defaultTop": 1689.1184266780676,
      "defaultWidth": 71.68747327917913,
      "defaultHeight": 43.99700726806327,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          1430.3856348867039,
          1744.4993587002994,
          2860.7712697734078,
          1744.4993587002994,
          2860.7712697734078,
          1889.8743052586576,
          1430.3856348867039,
          1889.8743052586576
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-1",
      "raw": "1653,2016,3306,2016,3306,2184,1653,2184",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 1430.3856348867039,
      "defaultTop": 1744.4993587002994,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 144.37494655835826,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "raw": "1874,2072,1916,2072,1916,2098,1874,2098",
      "points": [
          1603.451047456178,
          1781.7084224027362,
          1676.1385207353571,
          1781.7084224027362,
          1676.1385207353571,
          1826.7054296707995,
          1603.451047456178,
          1826.7054296707995
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-1-0",
      
      "defaultLeft": 1603.451047456178,
      "defaultTop": 1781.7084224027362,
      "defaultWidth": 71.68747327917913,
      "defaultHeight": 43.99700726806327,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "raw": "2535,2072,2577,2072,2577,2098,2535,2098",
      "points": [
          2175.43223599829,
          1781.7084224027362,
          2248.119709277469,
          1781.7084224027362,
          2248.119709277469,
          1826.7054296707995,
          2175.43223599829,
          1826.7054296707995
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-1-1",
      
      "defaultLeft": 2175.43223599829,
      "defaultTop": 1781.7084224027362,
      "defaultWidth": 71.68747327917936,
      "defaultHeight": 43.99700726806327,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "raw": "1874,2133,1916,2133,1916,2159,1874,2159",
      "points": [
          1603.451047456178,
          1834.493373236426,
          1676.1385207353571,
          1834.493373236426,
          1676.1385207353571,
          1879.4903805044892,
          1603.451047456178,
          1879.4903805044892
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-1-2",
      
      "defaultLeft": 1603.451047456178,
      "defaultTop": 1834.493373236426,
      "defaultWidth": 71.68747327917913,
      "defaultHeight": 43.99700726806327,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "raw": "2535,2133,2577,2133,2577,2159,2535,2159",
      "points": [
          2175.43223599829,
          1834.493373236426,
          2248.119709277469,
          1834.493373236426,
          2248.119709277469,
          1879.4903805044892,
          2175.43223599829,
          1879.4903805044892
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-1-3",
      
      "defaultLeft": 2175.43223599829,
      "defaultTop": 1834.493373236426,
      "defaultWidth": 71.68747327917936,
      "defaultHeight": 43.99700726806327,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": true,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  },
  {
      "points": [
          1430.3856348867039,
          1889.8743052586576,
          2860.7712697734078,
          1889.8743052586576,
          2860.7712697734078,
          1931.4100042753314,
          1430.3856348867039,
          1931.4100042753314
      ],
      "id": "CEE5B03A0EE84D7672AWX760-4--sqs-2",
      "raw": "1653,2184,3306,2184,3306,2232,1653,2232",
      "config": {
          "visible": false
      },
      
      "defaultLeft": 1430.3856348867039,
      "defaultTop": 1889.8743052586576,
      "defaultWidth": 1429.3856348867039,
      "defaultHeight": 40.53569901667379,
      "hoverCursor": "pointer",
      "selectable": false,
      "visible": false,
      "fill": "transparent",
      "stroke": "#04aa65",
      "strokeUniform": true
  }
]
export default function Counter() {
  return (
    <>
      <ReactFabric defaultCentered  style={{ border: '1px solid red' }}>
        {
          rects.map((rect,index)=>(
            <Rect key={index} {...rect} left={rect.defaultLeft} strokeWidth={1} top={rect.defaultTop}  width={rect.defaultWidth} height={rect.defaultHeight}/>
          ))
        }
      
      </ReactFabric>
    </>
  )
}
