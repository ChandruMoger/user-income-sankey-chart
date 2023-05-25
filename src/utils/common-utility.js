const addLink = (source, target, value) => {
  return {
    source: source,
    target: target,
    value: value,
  };
};

const formatNodes = (parentNode, dependNode, data, nodes, links) => {
  const incomeValue = data.reduce(
    (acc, item) => acc + item.amount, 0
  );
  links.push(addLink(parentNode, dependNode, incomeValue));

  data.forEach((item) => {
    let nodeIndex = nodes.findIndex((node) => node.name === item.name);
    if(nodeIndex === -1) {
      nodes.push({
        node: nodes.length,
        name: item.name,
      });
      nodeIndex = nodes.length - 1;
    }
    links.push(addLink(dependNode, nodeIndex, item.amount));       
    
  });
}

export {
  formatNodes,
  addLink
}