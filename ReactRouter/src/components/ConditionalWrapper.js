
/**
 * 
 * @param {*} param0 allows for a components to be rendered for specific children to become its parent if a condition is met
 * @description taken from https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
 * @returns 
 */
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default ConditionalWrapper; 
