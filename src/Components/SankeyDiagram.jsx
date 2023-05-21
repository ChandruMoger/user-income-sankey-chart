import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { sankey as d3Sankey } from 'd3-sankey';

Sankey.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func
};

export default function Sankey({
  top,
  left,
  className,
  data,
  size,

  nodeId,
  nodeAlign,
  nodeWidth,
  nodePadding,
  nodePaddingRatio,
  extent,
  iterations,
  circularLinkGap,
  linkColor="source-target",
  children,
  nodeComponent,
  ...restProps
}) {
  const sankey = d3Sankey();
  if (size) sankey.size(size);
  if (nodeWidth) sankey.nodeWidth(nodeWidth);
  if (nodePadding) sankey.nodePadding(nodePadding);
  if (extent) sankey.extent(extent);

  const sankeyData = sankey(data);

  if (!!children) {
    return (
      <Group top={top} left={left} className={cx('vx-sankey', className)}>
        {children({ data: sankeyData })}
      </Group>
    );
  }
}
