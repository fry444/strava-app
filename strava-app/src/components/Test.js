import React, { useEffect, useState, Fragment } from "react";
import { Stage, Layer, Image, Circle } from "react-konva";

const Test = () => {
  const [image, setImage] = useState(new window.Image());
  useEffect(() => {
    const img = new window.Image();
    img.src =
      "http://piso12.tplinkdns.com:8080/backoffice-api/media-resources/download/20200310e356e85d3d444ad7b838b575ab6d952b.jpeg";
    setImage(img);
  }, []);

  const positions = [
    { x: 20, y: 25 },
    { x: 20, y: 25 },
    { x: 30, y: 34 },
    { x: 30, y: 34 },
    { x: 30, y: 34 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 55 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
    { x: 60, y: 60 },
  ];

  let heatmapData = [];

  const addPosition = (position) => {
    const index = heatmapData.findIndex(
      (e) => e.id === position.x + "" + position.y
    );
    if (index === -1) {
      heatmapData.push({
        id: position.x + "" + position.y,
        x: position.x,
        y: position.y,
        value: 1,
      });
    } else {
      const newValue = heatmapData[index].value+1;
      heatmapData[index] = {
        id: position.x + "" + position.y,
        x: position.x,
        y: position.y,
        value: newValue,
      };
    }
  };

  positions.forEach((position) => {
    addPosition(position);
  });

  const getHeatColor = (value) => {
    const colors = [
      "#52ff7d",
      "#52ff52",
      "#7dff52",
      "#a8ff52",
      "#d4ff52",
      "#ffff52",
      "#ffd452",
      "#ffa852",
      "#ff7d52",
      "#ff5252",
    ];
    const colourCount = 10;
    const maxValue = 100;
    if (value > maxValue) {
      value = maxValue;
    }
    if (value <= colourCount) {
      value = colourCount;
    }
    return colors[Math.floor(value / colourCount) - 1];
  };

  return (
    <Stage width={2060} height={2906}>
      <Layer>
        <Image x={0} y={0} image={image} />
        {heatmapData
          ? heatmapData.map((position) => {
              let colorValue = getHeatColor(position.value);
              return (
                <Fragment key={position.id}>
                  <Circle
                    key={position.id+'_outer'}
                    x={position.x}
                    y={position.y}
                    radius={10}
                    fill={colorValue}
                    opacity={0.5}
                  />
                  <Circle
                    key={position.id+'inner'}
                    x={position.x}
                    y={position.y}
                    radius={5}
                    fill={colorValue}
                  />
                </Fragment>
              );
            })
          : null}
      </Layer>
    </Stage>
  );
};

export default Test;
