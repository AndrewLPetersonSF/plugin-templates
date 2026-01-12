# examples

- Generate a RecordPage FlexiPage for Account in the current directory:

  <%= config.bin %> <%= command.id %> --name Account_Record_Page --template RecordPage --entity-name Account

- Generate an AppPage FlexiPage in the "force-app/main/default/flexipages" directory:

  <%= config.bin %> <%= command.id %> --name Sales_Dashboard --template AppPage --output-dir force-app/main/default/flexipages

- Generate a HomePage FlexiPage with a custom label:

  <%= config.bin %> <%= command.id %> --name Custom_Home --template HomePage --label "Sales Home Page"

- Generate a RecordPage with dynamic highlights fields:

  <%= config.bin %> <%= command.id %> --name Property_Page --template RecordPage --entity-name Rental_Property**c --primary-fields Name --secondary-fields Property_Address**c,City**c,Monthly_Rent**c

# summary

Generate a FlexiPage (Lightning page) from Salesforce templates.

# description

Generates a FlexiPage in the specified directory or the current working directory. The FlexiPage file is created with the designated name using built-in Salesforce templates.

Template Types:

- RecordPage: For object detail pages (requires --entity-name)
- AppPage: For standalone application pages
- HomePage: For custom home pages

Templates are bundled with the @salesforce/templates package.

# flags.name.summary

Name of the FlexiPage.

# flags.name.description

The name can contain only alphanumeric characters, must start with a letter, and can't end with an underscore or contain two consecutive underscores.

# flags.template.summary

Template type for the FlexiPage.

# flags.template.description

The type of FlexiPage to generate: RecordPage (object detail page), AppPage (standalone page), or HomePage (custom home).

# flags.label.summary

The label saved in the metadata for the FlexiPage.

# flags.label.description

If not specified, uses the FlexiPage name as the label.

# flags.description.summary

Description for the FlexiPage.

# flags.description.description

Provides context about the purpose of this FlexiPage.

# flags.entityName.summary

The SObject API name (required for RecordPage).

# flags.entityName.description

For RecordPage templates, specify the object API name (e.g., 'Account', 'Opportunity', 'Custom_Object\_\_c'). This sets the sobjectType in the FlexiPage metadata.

# flags.primaryFields.summary

Primary field(s) for dynamic highlights (RecordPage only).

# flags.primaryFields.description

Comma-separated list of field API names to display as primary fields in the dynamic highlights component. Typically the Name field.

# flags.secondaryFields.summary

Secondary field(s) for dynamic highlights (RecordPage only).

# flags.secondaryFields.description

Comma-separated list of field API names to display as secondary fields in the dynamic highlights component. These are additional key fields shown in the header.

# errors.recordPageRequiresEntityName

RecordPage template requires the --entity-name flag to specify the SObject API name (e.g., 'Account', 'Opportunity', 'Custom_Object\_\_c').
