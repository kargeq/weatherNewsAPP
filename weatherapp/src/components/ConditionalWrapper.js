const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;


  export default ConditionalWrapper; //https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2