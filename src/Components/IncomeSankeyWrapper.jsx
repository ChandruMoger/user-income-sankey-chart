import React, { useState, memo } from "react";
import { Group } from "@vx/group";
import { Text } from "@vx/text";
import { scaleSequential } from "d3-scale";
import { interpolateCool } from "d3-scale-chromatic";
import { linkHorizontal } from "d3-shape";
import { useTranslation } from "react-i18next";

const path = linkHorizontal()
  .source((d) => [d.source.x1, d.y0])
  .target((d) => [d.target.x0, d.y1]);

import Sankey from "./SankeyDiagram";
import { formatNodes } from "../utils/common-utility";

const color = scaleSequential(interpolateCool);

function SankeyWrapper(props) {
  const { t, i18n } = useTranslation();
  const [heighlightData, setHeighlightData] = useState({
    highlightLinkIndexes: [],
    highlightNode: null,
  });
  const defaultNodes = [
    {
      node: 0,
      name: "income",
    },
    {
      node: 1,
      name: "expenditure",
    },
  ];

  const formatIncomeData = (data) => {
    const links = [];
    const nodes = [...defaultNodes];
    data.forEach((user) => {
      nodes.push({
        node: nodes.length,
        name: user.name,
      });

      const parentNode = nodes.length - 1;
      if (user.incomes) {
        formatNodes(parentNode, 0, user.incomes, nodes, links);      
      }

      if (user.expenditures) {
        formatNodes(parentNode, 1, user.expenditures, nodes, links);        
      }
    });

    const userdata = {
      nodes: [...nodes],
      links: [...links],
    };
    return userdata;
  };

  const {
    data,
    width,
    height,
    margin = {
      top: 0,
      left: 0,
      right: 200,
      bottom: 0,
    },
  } = props;
  if (width < 10) return null;

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <Sankey
        top={margin.top}
        left={margin.left}
        data={formatIncomeData(data)}
        size={[width, height]}
        nodeWidth={15}
        nodePadding={10}
        extent={[
          [1, 1],
          [width - 1, height - 6],
        ]}
      >
        {({ data }) => (
          <Group>
            {data.nodes.map((node, i) => {
              return (
                <Group top={node.y0} left={node.x0} key={`node-${i}`}>
                  <rect
                    id={`rect-${i}`}
                    width={node.x1 - node.x0}
                    height={node.y1 - node.y0}
                    fill={color(node.depth)}
                    opacity={0.5}
                  >
                    <title>{`${t(`${node.name}`)}\n${node.value}`}</title>
                  </rect>
                  <Text
                    x={16}
                    y={(node.y1 - node.y0) / 2}
                    verticalAnchor="middle"
                    style={{
                      font: "10px sans-serif",
                    }}
                  >
                    {t(`${node.name}`)}
                  </Text>
                </Group>
              );
            })}

            <Group>
              {data.links.map((link, i) => (
                <path
                  key={`link-${i}`}
                  d={path(link)}
                  stroke="black"
                  strokeWidth={Math.max(1, link.width)}
                  opacity={
                    heighlightData.highlightLinkIndexes.includes(i) ? 0.5 : 0.15
                  }
                  onMouseOver={(e) => {
                    setHeighlightData({ highlightLinkIndexes: [i] });
                  }}
                  onMouseOut={(e) => {
                    setHeighlightData({ highlightLinkIndexes: [] });
                  }}
                >
                  <title>
                    {t(`${link.source.name}`)} -&gt; {t(`${link.target.name}`)}:{" "}
                    {link.value}
                  </title>
                </path>
              ))}
            </Group>
          </Group>
        )}
      </Sankey>
    </svg>
  );
}

export default memo(SankeyWrapper);
