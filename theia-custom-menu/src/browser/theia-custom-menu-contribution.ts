import { inject, injectable } from "inversify";
import { Command, CommandContribution, CommandRegistry, MenuModelRegistry } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";
import { GettingStartedCommand } from '@theia/getting-started/lib/browser/getting-started-contribution';

export const GETTING_STARTED_TOGGLE = {
    id: 'custom-getting-started-toggle',
    label: "GS: Toggle Menu"
};

@injectable()
export class TheiaCustomMenuCommandContribution implements CommandContribution {

    @inject(MenuModelRegistry)
    protected readonly menuRegistry: MenuModelRegistry;

    protected _isEnabled: boolean = true;
    protected _command: Command = GettingStartedCommand;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(GETTING_STARTED_TOGGLE, {
            execute: () => {
                this.toggleMenu(this._isEnabled);
                this._isEnabled = !this._isEnabled;
            }
        });
    }

    protected toggleMenu(isEnabled: boolean): void {
        if (isEnabled) {
            this.menuRegistry.unregisterMenuAction(this._command.id);
        } else {
            this.menuRegistry.registerMenuAction(CommonMenus.HELP, {
                commandId: this._command.id,
                label: this._command.label,
                order: 'a10'
            });
        }
    }

}
