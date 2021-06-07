import { CommandContribution } from '@theia/core/lib/common/command';
import { ContainerModule } from 'inversify';
import { TheiaCustomMenuCommandContribution } from './theia-custom-menu-contribution';

export default new ContainerModule(bind => {
    bind(TheiaCustomMenuCommandContribution).toSelf().inSingletonScope();
    bind(CommandContribution).to(TheiaCustomMenuCommandContribution);
});
