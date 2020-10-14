import { shallow } from "enzyme";
import React from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import Task from "./Task";

describe("mark tasks", () => {
    const fixture = "hello";

    it("should render the name of the task", () => {
        const component = shallow(
            <Task name={fixture} state={true}/>
        );

        expect(
            component.find({ "data-id": "name" }).contains(fixture)
        ).toBeTruthy();
    });

    it("should render an empty circle if state is false ", () => {
        const component = shallow(
            <Task name={fixture} state={false}/>
        );

        expect(component.find(FaRegCircle).exists()).toBeTruthy();
    });

    it("should render a ticked circle if state is true ", () => {
        const component = shallow(
            <Task name={fixture} state={true}/>
        );

        expect(component.find(FaCheckCircle).exists()).toBeTruthy();
    });

    it("should render the name of the task with a line through if state is true", () => {
        const component = shallow(
            <Task name={fixture} state={true}/>
        );

        const containerStyle = component.find({ "data-id": "name" }).props().css;
        expect(containerStyle).toHaveProperty("textDecoration", "line-through");
    });

    it("should mark the task complete when an incomplete task is clicked", () => {	
        const component = shallow(	
            <Task name={fixture} state={false}/>	
        );	

        component.simulate("click");	
        expect(component.find(FaCheckCircle).exists()).toBeTruthy();	
    });	

    it("should mark the task incomplete when a complete task is clicked", () => {	
        const component = shallow(	
            <Task name={fixture} state={true}/>	
        );	

        component.simulate("click");	
        expect(component.find(FaRegCircle).exists()).toBeTruthy();	
    });

    it("should call the api with the updated state when a task is clicked", () => {
        const callback = jest.fn();	

        const component = shallow(	
            <Task name={fixture} state={false} callback={callback}/>	
        );	

        component.simulate("click");	
        expect(callback).toBeCalledWith({ name: fixture, state: true });	
    });


});
