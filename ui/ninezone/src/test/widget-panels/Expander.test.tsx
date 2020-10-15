/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { fireEvent, render } from "@testing-library/react";
import {
  createHorizontalPanelState, createNineZoneState, createPanelsState, createVerticalPanelState, NineZoneDispatch, WidgetPanelExpander, WidgetPanelExpanders,
} from "../../ui-ninezone";
import { NineZoneProvider } from "../Providers";


describe("WidgetPanelExpanders", () => {
  it("should render", () => {
    const nineZone = createNineZoneState({
      panels: createPanelsState({
        left: createVerticalPanelState("left", {
          pinned: false,
          collapsed: true,
        }),
        bottom: createHorizontalPanelState("bottom", {
          pinned: false,
          collapsed: true,
        }),
      }),
    });
    const { container } = render(
      <NineZoneProvider
        state={nineZone}
      >
        <WidgetPanelExpanders />
      </NineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });
});

describe("WidgetPanelExpander", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should dispatch `PANEL_SET_COLLAPSED`", () => {
    const timers = sandbox.useFakeTimers();
    const dispatch = sinon.stub<NineZoneDispatch>();
    const { container } = render(
      <NineZoneProvider
        dispatch={dispatch}
      >
        <WidgetPanelExpander side="left" />
      </NineZoneProvider>,
    );
    const expander = container.getElementsByClassName("nz-widgetPanels-expander")[0];
    fireEvent.mouseOver(expander);
    timers.tick(300);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "PANEL_SET_COLLAPSED",
      side: "left",
      collapsed: false,
    });
  });

  it("should not dispatch `PANEL_SET_COLLAPSED` if mouse moves out", () => {
    const timers = sandbox.useFakeTimers();
    const dispatch = sinon.stub<NineZoneDispatch>();
    const { container } = render(
      <NineZoneProvider
        dispatch={dispatch}
      >
        <WidgetPanelExpander side="left" />
      </NineZoneProvider>,
    );
    const expander = container.getElementsByClassName("nz-widgetPanels-expander")[0];
    fireEvent.mouseOver(expander);
    fireEvent.mouseOut(expander);
    timers.tick(300);

    sinon.assert.notCalled(dispatch);
  });

  it("should reset timer if mouse moves", () => {
    const timers = sandbox.useFakeTimers();
    const dispatch = sinon.stub<NineZoneDispatch>();
    const { container } = render(
      <NineZoneProvider
        dispatch={dispatch}
      >
        <WidgetPanelExpander side="left" />
      </NineZoneProvider>,
    );
    const expander = container.getElementsByClassName("nz-widgetPanels-expander")[0];
    fireEvent.mouseOver(expander);
    timers.tick(150);

    fireEvent.mouseMove(expander, { clientX: 20 });

    timers.tick(150);
    sinon.assert.notCalled(dispatch);

    timers.tick(100);
    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "PANEL_SET_COLLAPSED",
      side: "left",
      collapsed: false,
    });
  });

  it("should not reset timer if mouse move threshold is not exceeded", () => {
    const timers = sandbox.useFakeTimers();
    const dispatch = sinon.stub<NineZoneDispatch>();
    const { container } = render(
      <NineZoneProvider
        dispatch={dispatch}
      >
        <WidgetPanelExpander side="left" />
      </NineZoneProvider>,
    );
    const expander = container.getElementsByClassName("nz-widgetPanels-expander")[0];
    fireEvent.mouseOver(expander);
    timers.tick(150);

    fireEvent.mouseMove(expander, { clientX: 4 });

    timers.tick(100);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "PANEL_SET_COLLAPSED",
      side: "left",
      collapsed: false,
    });
  });
});
