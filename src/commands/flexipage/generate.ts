/*
 * Copyright (c) 2026, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Flags, loglevel, orgApiVersionFlagWithDeprecations, SfCommand, Ux } from '@salesforce/sf-plugins-core';
import { CreateOutput, FlexipageOptions, TemplateType } from '@salesforce/templates';
import { Messages } from '@salesforce/core';
import { getCustomTemplates, runGenerator } from '../../utils/templateCommand.js';
import { internalFlag, outputDirFlag } from '../../utils/flags.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@salesforce/plugin-templates', 'flexipage');

export default class FlexipageGenerate extends SfCommand<CreateOutput> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');
  public static readonly aliases = ['force:flexipage:create'];
  public static readonly deprecateAliases = true;

  public static readonly flags = {
    name: Flags.string({
      char: 'n',
      summary: messages.getMessage('flags.name.summary'),
      description: messages.getMessage('flags.name.description'),
      required: true,
      aliases: ['flexipagename'],
      deprecateAliases: true,
    }),
    template: Flags.option({
      char: 't',
      summary: messages.getMessage('flags.template.summary'),
      description: messages.getMessage('flags.template.description'),
      required: true,
      options: ['RecordPage', 'AppPage', 'HomePage'] as const,
    })(),
    'output-dir': outputDirFlag,
    'api-version': orgApiVersionFlagWithDeprecations,
    label: Flags.string({
      summary: messages.getMessage('flags.label.summary'),
      description: messages.getMessage('flags.label.description'),
      aliases: ['masterlabel'],
      deprecateAliases: true,
    }),
    description: Flags.string({
      summary: messages.getMessage('flags.description.summary'),
      description: messages.getMessage('flags.description.description'),
    }),
    'entity-name': Flags.string({
      summary: messages.getMessage('flags.entityName.summary'),
      description: messages.getMessage('flags.entityName.description'),
      aliases: ['sobject', 'entity'],
      deprecateAliases: true,
    }),
    'primary-fields': Flags.string({
      summary: messages.getMessage('flags.primaryFields.summary'),
      description: messages.getMessage('flags.primaryFields.description'),
      multiple: true,
      delimiter: ',',
    }),
    'secondary-fields': Flags.string({
      summary: messages.getMessage('flags.secondaryFields.summary'),
      description: messages.getMessage('flags.secondaryFields.description'),
      multiple: true,
      delimiter: ',',
    }),
    internal: internalFlag,
    loglevel,
  };

  public async run(): Promise<CreateOutput> {
    const { flags } = await this.parse(FlexipageGenerate);

    // Validate RecordPage requirements
    if (flags.template === 'RecordPage' && !flags['entity-name']) {
      throw new Error(messages.getMessage('errors.recordPageRequiresEntityName'));
    }

    const flagsAsOptions: FlexipageOptions = {
      flexipagename: flags.name,
      template: flags.template,
      outputdir: flags['output-dir'],
      apiversion: flags['api-version'],
      masterlabel: flags.label,
      description: flags.description,
      entityName: flags['entity-name'],
      primaryFields: flags['primary-fields'],
      secondaryFields: flags['secondary-fields'],
      internal: flags.internal,
      // Templates are now bundled locally in @salesforce/templates
      // No need to specify flexipageTemplatesGitRepo - it will use local templates
    };

    // FlexipageOptions extends TemplateOptions, so this is safe
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return runGenerator({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      templateType: TemplateType.Flexipage,
      opts: flagsAsOptions,
      ux: new Ux({ jsonEnabled: this.jsonEnabled() }),
      templates: getCustomTemplates(this.configAggregator),
    });
  }
}
