/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IConfiguration } from 'vs/editor/common/editorCommon';
import { ViewEventDispatcher } from 'vs/editor/common/view/viewEventDispatcher';
import { ViewEventHandler } from 'vs/editor/common/viewModel/viewEventHandler';
import { IViewLayout, IViewModel } from 'vs/editor/common/viewModel/viewModel';
import { ITheme, ThemeType } from 'vs/platform/theme/common/themeService';
import { ColorIdentifier } from 'vs/platform/theme/common/colorRegistry';
import { Color } from 'vs/base/common/color';

export class EditorTheme {

	private _theme: ITheme;

	public get type(): ThemeType {
		return this._theme.type;
	}

	constructor(theme: ITheme) {
		this._theme = theme;
	}

	public update(theme: ITheme): void {
		this._theme = theme;
	}

	public getColor(color: ColorIdentifier): Color | undefined {
		return this._theme.getColor(color);
	}
}

export class ViewContext {

	public readonly configuration: IConfiguration;
	public readonly model: IViewModel;
	public readonly viewLayout: IViewLayout;
	public readonly privateViewEventBus: ViewEventDispatcher;
	public readonly theme: EditorTheme;

	constructor(
		configuration: IConfiguration,
		theme: ITheme,
		model: IViewModel,
		privateViewEventBus: ViewEventDispatcher
	) {
		this.configuration = configuration;
		this.theme = new EditorTheme(theme);
		this.model = model;
		this.viewLayout = model.viewLayout;
		this.privateViewEventBus = privateViewEventBus;
	}

	public addEventHandler(eventHandler: ViewEventHandler): void {
		this.privateViewEventBus.addEventHandler(eventHandler);
	}

	public removeEventHandler(eventHandler: ViewEventHandler): void {
		this.privateViewEventBus.removeEventHandler(eventHandler);
	}
}
