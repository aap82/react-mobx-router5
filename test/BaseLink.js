import React from "react";
import {findRenderedComponentWithType, renderIntoDocument} from "react-addons-test-utils";
import {expect} from "chai";
import {spy, stub} from "sinon";
import {Provider as MobXProvider} from "mobx-react";
import {mobxPlugin, RouterStore} from "mobx-router5";
import {createTestRouter, FnComp, renderWithProvider, renderWithStore} from "./utils/test-utils";
import {withRoute} from "../src/index";
import {mount, shallow} from "enzyme";
import {createRouter} from "router5";
import BaseLink from "../src/modules/BaseLink";

// TOFIX: type-detect bug
// I've manually modified type-detect: https://github.com/chaijs/type-detect/pull/91/files

describe('BaseLink component', () => {
  let router;
  let routerStore;

  beforeEach(() => {
    routerStore = new RouterStore();
    router = createTestRouter();
    router.usePlugin(mobxPlugin(routerStore));
  });

  context('Exceptions', function() {
    it('should not throw an error if `routeName`, `router` and `onClick` props are missing', () => {
      const renderTreeFn = () => shallow(
        <BaseLink />
      );
      expect(renderTreeFn).to.not.throw();
    });

    it('should throw an error if prop `routeName` passed but not props `router` or `routerStore`', () => {
      router = createRouter();
      router.addNode('home', '/home');
      router.setOption('defaultRoute', 'home');
      router.start();
      const renderTreeFn = () => shallow(
        <BaseLink routeName={'home'}/>
      );
      expect(renderTreeFn).to.throw(/^\[react-mobx-router5\]\[BaseLink\] missing router instance$/);
    });

    it('should not throw an error if props `routeName` and `router` are passed', () => {
      routerStore = new RouterStore();
      router.addNode('home', '/home');
      router.setOption('defaultRoute', 'home');
      router.start();
      const renderTreeFn = () => shallow(
        <BaseLink routeName={'home'} router={router}/>
      );
      expect(renderTreeFn).to.not.throw();
    });

    it('should not throw an error if props `routeName` and `routerStore` defined', () => {
      router.addNode('home', '/home');
      router.setOption('defaultRoute', 'home');
      router.start();
      const renderTreeFn = () => shallow(
        <BaseLink routeName={'home'} routerStore={routerStore}/>
      );
      expect(renderTreeFn).to.not.throw();
    });

    it('should throw an error if browserPlugin is not used', () => {
      router = createRouter();
      const renderTreeFn = () => shallow(
        <BaseLink router={router} />
      );
      expect(renderTreeFn).to.throw(/^\[react-mobx-router5\]\[BaseLink\] missing browser plugin, href might be build incorrectly$/);
    });

  });

  context('Hyperlink', function() {
    it('should render an hyperlink element', () => {
      router.addNode('home', '/home');
      router.setOption('defaultRoute', 'home');
      router.start();
      const output = shallow(
        <BaseLink router={router} routeName={'home'}/>
      );
      expect(output.find('a')).to.have.attr('href', '/home');
    });
  });

});
