import React from "react";
import { configure, shallow } from "enzyme";
import Task from "./Task";
// import Adapter from "enzyme-adapter-react-16";

// configure({ adapter: new Adapter() });

describe("Toggle check", () => {
    const fixture = "hello";
    const callback = jest.fn();

    it("should render Task ", () => {
        const component = shallow(<Task name={fixture} state={true} callback={callback} />);

        expect(component.find(Task)).toBeTruthy();
    });

    it("should render the name of the task", () => {
        const component = shallow(<Task name={fixture} state={true} callback={callback}/>);

        expect(
            component.find({ "data-id": "name" }).contains(fixture)
        ).toBeTruthy();
    });

    it("should render an empty circle if state is false ", () => {
        const component = shallow(<Task name={fixture} state={false} callback={callback}/>);

        expect(component.find(".fa-circle")).toHaveLength(1);
        expect(component.find(".far")).toHaveLength(1);
    });

    it("should render a ticked circle if state is true ", () => {
        const component = shallow(<Task name={fixture} state={true} callback={callback}/>);

        expect(component.find(".fa-check-circle")).toHaveLength(1);
        expect(component.find(".fas")).toHaveLength(1);
    });

    it("should render the name of the task with a line through if state is true", () => {
        const component = shallow(<Task name={fixture} state={true} callback={callback}/>);

        let containerStyle = component.find({ "data-id": "name" }).props().css;
        expect(containerStyle).toHaveProperty("textDecoration", "line-through");
    });

    it("should render a ticked circle if state is false and the task is clicked", () => {
        const component = shallow(<Task name={fixture} state={false} callback={callback}/>);
        component.simulate("click");

        expect(component.find(".fa-check-circle")).toHaveLength(1);
        expect(component.find(".fas")).toHaveLength(1);
    });

    it("should render a name with a line through if state is false and the task is clicked", () => {
        const component = shallow(<Task name={fixture} state={false} callback={callback}/>);
        component.simulate("click");

        let containerStyle = component.find({ "data-id": "name" }).props().css;
        expect(containerStyle).toHaveProperty("textDecoration", "line-through");
    });

    it.only("should call injected callback on click", () => {
        const component = shallow(<Task name={fixture} state={false} callback={callback}/>);
        component.simulate("click");

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
