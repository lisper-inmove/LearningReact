import React from 'react';

interface State {
  count: number;
}

class Home extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    // 如果是在浏览器端渲染，可以直接访问 localStorage, sessionStorage 和 document.cookie
    // 而如果是在服务端渲染的话 需要加上 if (typeof window === 'undefined') 的判断
    // TODO: 待确认
    //    在React组件中，你可以在componentDidMount和componentDidUpdate等生命周期方法中安全地访问window，因为这些方法只会在客户端运行。
    const data1 = localStorage.getItem('userinfo');
    const data2 = sessionStorage.getItem('userinfo');
    console.log(document.cookie);
    console.log('Component did mount', data1, data2, document.cookie);
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    console.log('componentDidUpdate: 组件被更新后立即被调用', prevProps, prevState, snapshot);
  }

  componentWillUnmount(prevProps: any, prevState: any, snapshot: any) {
    console.log('componentWillUnmount: 组件被移除时调用', prevProps, prevState, snapshot);
  }
  
  // 这里的props是父组件传递给子组件时的参数 如: <Home a="a">, => props =  {"a": "a"}
  // 这个函数会在render被调用前被调用 state则是新的值
  // 因为每次渲染时都会被调用，所以这里的代码最好是没有性能问题的代码
  static getDerivedStateFromProps(props: any, state: any) {
    console.log("getDerivedStateFromProps: 在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。");
    // console.log("getDerivedStateFromProps: ", props, state);
    return {count: state.count + 1};
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log("shouldComponentUpdate: 会返回一个布尔值，指定 React 是否应该继续渲染，默认值是 true， 即 state 每次发生变化组件都会重新渲染。");
    return true;
  }

  /**
   *
    "最新的渲染输出被提交到DOM之前会被调用"这句话是对`getSnapshotBeforeUpdate`生命周期方法的描述。
    这个方法是在React组件的更新过程中的一个特定时刻被调用的。

    在React中，当组件的state或props发生变化时，React会重新渲染该组件。
    重新渲染的过程包括调用组件的`render`方法来生成新的虚拟DOM，然后与旧的虚拟DOM进行比较，找出需要在实际DOM中进行的最小改动。这个过程被称为"diffing"。
    在找出需要进行的改动之后，React会在实际DOM中应用这些改动，这个过程被称为"提交"。在提交阶段，React会更新DOM来反映组件的新状态。
    `getSnapshotBeforeUpdate`方法就是在这个"提交"阶段开始之前，也就是新的渲染输出被提交到DOM之前被调用的。
    在这个方法中，你可以获取到DOM的当前状态，这在某些情况下是有用的，例如你可能想要获取到用户当前的滚动位置，然后在更新后保持这个滚动位置。
    总的来说，"最新的渲染输出被提交到DOM之前会被调用"这句话的意思就是`getSnapshotBeforeUpdate`方法会在React准备更新DOM以反映组件新的状态之前被调用。

   **/
  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log("getSnapshotBeforeUpdate: 方法在最近一次渲染输出（提交到 DOM 节点）之前调用。");
    return {count: this.state.count + 1};
  }

  // 唯一必须实现的方法
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}


class HomeMain extends React.Component {

  state = {
    showChild: true
  };

  toggleChild = () => {
    this.setState(state => ({ showChild: !state.showChild }));
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleChild}>Toggle Child</button>
        {this.state.showChild && <Home />}
      </div>
    );
  }
}


export default HomeMain;
