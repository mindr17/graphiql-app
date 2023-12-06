import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  FloatAttribute,
  CustomField,
  SetPluginOptions,
  RichTextAttribute,
  ComponentAttribute,
  SingleTypeSchema,
  TextAttribute,
  MediaAttribute,
  ComponentSchema,
  DateAttribute,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiChildChild extends CollectionTypeSchema {
  info: {
    singularName: 'child';
    pluralName: 'children';
    displayName: 'Child';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    preSchoolPriceMonth: FloatAttribute;
    schoolPriceYear: FloatAttribute;
    Free: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['Free PreSchool', 'Free School', 'Free High Education']
      >;
    country_2: RelationAttribute<
      'api::child.child',
      'oneToOne',
      'api::country2.country2'
    >;
    legatumEducation: FloatAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::child.child',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::child.child',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCityCity extends CollectionTypeSchema {
  info: {
    singularName: 'city';
    pluralName: 'cities';
    displayName: 'City';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    numbeoCost: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    country_2: RelationAttribute<
      'api::city.city',
      'manyToOne',
      'api::country2.country2'
    >;
    body: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    airQuality: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    population: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    humanPerSquare: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    timeZone: EnumerationAttribute<['GMT-3']> &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    isDefaultCity: BooleanAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      DefaultTo<true>;
    climate: ComponentAttribute<'climate.climate'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    timeZoneGMT: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    isUdobniiGorod: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: StringAttribute &
      UniqueAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    expatistanCost: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    livingCostCost: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    numbeoLink: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    expatistanLink: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    livingCostLink: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    expatistanVisitDoctor: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    livingCostDoctor: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    nature_climate_ecology: RelationAttribute<
      'api::city.city',
      'oneToOne',
      'api::nature-climate-ecology.nature-climate-ecology'
    >;
    livingCostIncome: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    numbeoIncome: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    finance: ComponentAttribute<'city.finance'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ecology: ComponentAttribute<'city.ecology'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    medicine: ComponentAttribute<'city.medicine'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    county: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    numbeoCostRate: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    contributors: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    badData: BooleanAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::city.city', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::city.city', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::city.city',
      'oneToMany',
      'api::city.city'
    >;
    locale: StringAttribute;
  };
}

export interface ApiConfigConfig extends SingleTypeSchema {
  info: {
    singularName: 'config';
    pluralName: 'configs';
    displayName: 'Config';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    passportPowerFormula: TextAttribute;
    medicineQualityFormula: TextAttribute;
    medicineCostToQualityFormula: TextAttribute;
    crimeConfig: ComponentAttribute<'config.crime-config'>;
    medicineConfig: ComponentAttribute<'config.medicine-config'>;
    qualityOfLifeConfig: ComponentAttribute<'config.quality-of-life-config'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::config.config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::config.config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCountryCountry extends CollectionTypeSchema {
  info: {
    singularName: 'country';
    pluralName: 'countries';
    displayName: 'Country';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    Content: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    visaFreeDays: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    visaRules: ComponentAttribute<'country.visa-rules'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    residence: ComponentAttribute<'country.temp-residence', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    passport: ComponentAttribute<'country.passport'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    passportMethod: ComponentAttribute<'country.passport-methods', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    city: ComponentAttribute<'country.city', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    miniFlag: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    flagCover: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    author: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    finance: ComponentAttribute<'country.finance'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::country.country',
      'oneToMany',
      'api::country.country'
    >;
    locale: StringAttribute;
  };
}

export interface ApiCountry2Country2 extends CollectionTypeSchema {
  info: {
    singularName: 'country2';
    pluralName: 'country2s';
    displayName: 'Country2';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    medicine: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'api::medicine.medicine'
    >;
    cities: RelationAttribute<
      'api::country2.country2',
      'oneToMany',
      'api::city.city'
    >;
    finance: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'api::finance.finance'
    >;
    quality_of_life: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'api::quality-of-life.quality-of-life'
    >;
    slug: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    crime: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'api::crime.crime'
    >;
    passport: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'api::passport.passport'
    >;
    passport_methods: RelationAttribute<
      'api::country2.country2',
      'oneToMany',
      'api::passport-method.passport-method'
    > &
      PrivateAttribute;
    visa_rules: RelationAttribute<
      'api::country2.country2',
      'oneToMany',
      'api::visa.visa'
    >;
    locationGlobe: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    location: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    map: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    mapLink: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    residence_methods: RelationAttribute<
      'api::country2.country2',
      'oneToMany',
      'api::residence-method.residence-method'
    > &
      PrivateAttribute;
    residence: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'api::residence.residence'
    >;
    seo: ComponentAttribute<'shared.seo'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    climate: ComponentAttribute<'climate.climate'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    flagFlat: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    flagCloth: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    coverPage: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    nature_climate_ecology: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'api::nature-climate-ecology.nature-climate-ecology'
    >;
    child: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'api::child.child'
    >;
    medicineScore: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    crimeSafeScore: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    qualityOfLifeScore: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    passportPowerScore: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    livingCostAvg: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::country2.country2',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::country2.country2',
      'oneToMany',
      'api::country2.country2'
    >;
    locale: StringAttribute;
  };
}

export interface ApiCrimeCrime extends CollectionTypeSchema {
  info: {
    singularName: 'crime';
    pluralName: 'crimes';
    displayName: 'Crime n Safe';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    numbeoCrimeIndex: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 100;
      }>;
    ocIndexRating: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 10;
      }>;
    peaceRating: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 5;
      }>;
    gallupLaw: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 100;
      }>;
    body: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    corruptionPerception: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 100;
      }>;
    homicide100k: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 100;
      }>;
    country_2: RelationAttribute<
      'api::crime.crime',
      'oneToOne',
      'api::country2.country2'
    >;
    womenSecurity: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 1;
      }>;
    insurlyRating: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 100;
      }>;
    shortBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    roadDeathPer100k: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 100;
      }>;
    kidnappingPer100k: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 100;
      }>;
    legatumSafety: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::crime.crime',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::crime.crime',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::crime.crime',
      'oneToMany',
      'api::crime.crime'
    >;
    locale: StringAttribute;
  };
}

export interface ApiCrimeConfigCrimeConfig extends SingleTypeSchema {
  info: {
    singularName: 'crime-config';
    pluralName: 'crime-configs';
    displayName: 'crimeConfig';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    numbeoMax: FloatAttribute;
    ocIndexMax: FloatAttribute;
    peaceRatingMax: FloatAttribute;
    gallupLawMax: FloatAttribute;
    corruptionRatingMax: FloatAttribute;
    homicide100kMax: FloatAttribute;
    numbeoWeight: FloatAttribute;
    ocIndexWeight: FloatAttribute;
    peaceRatingWeight: FloatAttribute;
    gallupLawWeight: FloatAttribute;
    corruptionRatingWeight: FloatAttribute;
    homicide100kWeight: FloatAttribute;
    womenSecurityMax: FloatAttribute;
    womenSecurityWeight: FloatAttribute;
    insurlyRatingMax: FloatAttribute;
    insurlyRatingWeight: FloatAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::crime-config.crime-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::crime-config.crime-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCurrencyConfigCurrencyConfig extends SingleTypeSchema {
  info: {
    singularName: 'currency-config';
    pluralName: 'currency-configs';
    displayName: 'currencyConfig';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    usdToRub: FloatAttribute;
    usdToPeso: FloatAttribute;
    usdToLari: FloatAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::currency-config.currency-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::currency-config.currency-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiEcologyEcology extends CollectionTypeSchema {
  info: {
    singularName: 'ecology';
    pluralName: 'ecologies';
    displayName: 'Ecology';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::ecology.ecology',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::ecology.ecology',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiFinanceFinance extends CollectionTypeSchema {
  info: {
    singularName: 'finance';
    pluralName: 'finances';
    displayName: 'Finance';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    localCurrencyName: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    localCurrencySymbol: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    plus: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    minus: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    body: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    inflationPerYear: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    midIncomeLocalCurrency: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    personalTaxMax: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    country_2: RelationAttribute<
      'api::finance.finance',
      'oneToOne',
      'api::country2.country2'
    >;
    govHealthcareCosts: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    population: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    gdpShare: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    personalTaxMin: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    businessTaxMin: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ieTaxMax: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    capitalTaxMax: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    businessTaxMax: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    vatMin: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    vatMax: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    capitalTaxMin: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dividendsTaxMin: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dividendsTaxMax: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    taxBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ieTaxMin: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    parsonalTaxBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ieTaxBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    businessTaxBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    vatTaxBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dividendsTaxBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    internationalTaxBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    internationalTaxMax: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    capitalTaxBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    internationalTaxMin: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    gdpPerCapita: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    midIncomeAfterTax: DecimalAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    livingCostIncome: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    livingCostCost: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    numbeoIncome: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ExpatistanCost: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::finance.finance',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::finance.finance',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::finance.finance',
      'oneToMany',
      'api::finance.finance'
    >;
    locale: StringAttribute;
  };
}

export interface ApiLanguageLanguage extends CollectionTypeSchema {
  info: {
    singularName: 'language';
    pluralName: 'languages';
    displayName: 'language';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    shortbody: RichTextAttribute;
    body: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::language.language',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::language.language',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMedicineMedicine extends CollectionTypeSchema {
  info: {
    singularName: 'medicine';
    pluralName: 'medicines';
    displayName: 'Medicine';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    medicineComment: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    numbeoHealth: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    globalHealthSecurity: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        min: 0;
        max: 100;
      }>;
    plus: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    minus: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    country_2: RelationAttribute<
      'api::medicine.medicine',
      'oneToOne',
      'api::country2.country2'
    >;
    medicineCost2017: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needInsurance: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['yes', 'no', 'recommend']
      >;
    costComment: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    menLifeYears: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    womenLifeYears: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    ratioCostQualityComment: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    needInsuranceComment: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    stomatologyComment: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    insuranceComment: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    covidVaccinated: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 150;
      }>;
    ceoWorldMedicineRating: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    ceoWorldMedicineCostRating: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    covidProtectionScore: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    legatumHealth: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    livingCostDoctor: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    expatistanVisitDoctor: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::medicine.medicine',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::medicine.medicine',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::medicine.medicine',
      'oneToMany',
      'api::medicine.medicine'
    >;
    locale: StringAttribute;
  };
}

export interface ApiMedicineConfigMedicineConfig extends SingleTypeSchema {
  info: {
    singularName: 'medicine-config';
    pluralName: 'medicine-configs';
    displayName: 'medicineConfig';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    numbeoHint: RichTextAttribute;
    ceoWorldHint: RichTextAttribute;
    finalRatingHint: RichTextAttribute;
    numbeoHealthMax: FloatAttribute;
    globalHealthSecurityMax: FloatAttribute;
    ceoWorldMedicineMax: FloatAttribute;
    covidProtectionMax: FloatAttribute;
    legatumHealthMax: FloatAttribute;
    covidVaccinatedMax: FloatAttribute;
    numbeoHealthWeight: FloatAttribute;
    globalHealthSecurityWeight: FloatAttribute;
    ceoWorldMedicineWeight: FloatAttribute;
    covidProtectionWeight: FloatAttribute;
    legatumHealthWeight: FloatAttribute;
    covidVaccinatedWeight: FloatAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::medicine-config.medicine-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::medicine-config.medicine-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiNatureClimateEcologyNatureClimateEcology
  extends CollectionTypeSchema {
  info: {
    singularName: 'nature-climate-ecology';
    pluralName: 'nature-climate-ecologies';
    displayName: 'Nature Climate Ecology';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    winterTemp: FloatAttribute;
    summerTemp: FloatAttribute;
    summerRainDays: FloatAttribute;
    winterSnowDays: FloatAttribute;
    humidityMin: FloatAttribute;
    humidityMax: FloatAttribute;
    sunnyDaysYear: FloatAttribute;
    cloudyDaysYear: FloatAttribute;
    tags: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u0422\u0451\u043F\u043B\u043E\u0435 \u043C\u043E\u0440\u0435',
          '\u0425\u043E\u043B\u043E\u0434\u043D\u043E\u0435 \u043C\u043E\u0440\u0435',
          '\u0413\u043E\u0440\u044B',
          '------',
          '\u0426\u0443\u043D\u0430\u043C\u0438',
          '\u0423\u0440\u0430\u0433\u0430\u043D\u044B',
          '\u0417\u0435\u043C\u043B\u0435\u0442\u0440\u044F\u0441\u0435\u043D\u0438\u044F',
          '-----',
          '\u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u043A\u043B\u0438\u043C\u0430\u0442',
          '\u041F\u043B\u043E\u0445\u043E\u0439 \u043A\u043B\u0438\u043C\u0430\u0442',
          '\u041E\u0447\u0435\u043D\u044C \u0432\u043B\u0430\u0436\u043D\u043E',
          '\u0412\u043B\u0430\u0436\u043D\u043E',
          '\u0421\u0443\u0445\u043E',
          '\u041E\u0447\u0435\u043D\u044C \u0441\u0443\u0445\u043E',
          '\u0416\u0430\u0440\u043A\u043E',
          '\u041F\u0435\u043A\u043B\u043E',
          '\u041F\u0440\u043E\u0445\u043B\u0430\u0434\u043D\u043E',
          '\u0425\u043E\u043B\u043E\u0434\u043D\u043E',
          '\u0412\u0435\u0442\u0440\u0435\u043D\u043D\u043E',
          '\u0421\u043E\u043B\u043D\u0435\u0447\u043D\u043E',
          '\u041F\u0430\u0441\u043C\u0443\u0440\u043D\u043E',
          '\u0421\u043E\u043B\u043D\u0446\u0435 \u043A\u0440\u0443\u0433\u043B\u044B\u0439 \u0433\u043E\u0434'
        ]
      >;
    shortBody: RichTextAttribute;
    body: RichTextAttribute;
    country_2: RelationAttribute<
      'api::nature-climate-ecology.nature-climate-ecology',
      'oneToOne',
      'api::country2.country2'
    >;
    city: RelationAttribute<
      'api::nature-climate-ecology.nature-climate-ecology',
      'oneToOne',
      'api::city.city'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::nature-climate-ecology.nature-climate-ecology',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::nature-climate-ecology.nature-climate-ecology',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPagePage extends CollectionTypeSchema {
  info: {
    singularName: 'page';
    pluralName: 'pages';
    displayName: 'Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    seo: ComponentAttribute<'shared.seo'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    shortBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    h2: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    body: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    coverPage: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    h1: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      SetMinMaxLength<{
        maxLength: 150;
      }>;
    Translates: ComponentAttribute<'config.translate', true> &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::page.page', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::page.page', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::page.page',
      'oneToMany',
      'api::page.page'
    >;
    locale: StringAttribute;
  };
}

export interface ApiPassportPassport extends CollectionTypeSchema {
  info: {
    singularName: 'passport';
    pluralName: 'passports';
    displayName: 'Passport';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      UniqueAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    powerIndex: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    powerHey: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    visaFreeCountriesOptions: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['USA', 'Canada', 'China', 'Europe']
      >;
    airportVisa: JSONAttribute &
      CustomField<'plugin::multi-select.multi-select', ['hz']>;
    easyVisa: JSONAttribute &
      CustomField<'plugin::multi-select.multi-select', ['USA', 'Europe Union']>;
    passportPhoto: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    tags: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['DualCitizenship', 'NoDualCitizenship']
      >;
    dualCitizenship: EnumerationAttribute<
      ['Allowed', 'Allowed, but', 'Disallowed', 'Disallowed, but']
    > &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    passport_methods: RelationAttribute<
      'api::passport.passport',
      'oneToMany',
      'api::passport-method.passport-method'
    >;
    shortBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    country_2: RelationAttribute<
      'api::passport.passport',
      'oneToOne',
      'api::country2.country2'
    >;
    airportVisaCount: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    needVisaCount: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    visaFreeCount: IntegerAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    body: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    shortVisaFreeBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    passportMethods: ComponentAttribute<'passport.passport-methods', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    hisHer: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    europeanUnion: EnumerationAttribute<
      ['Member', 'Candidate', 'Potential Candidate']
    > &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    shortDualBody: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    shortBodyDual: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::passport.passport',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::passport.passport',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::passport.passport',
      'oneToMany',
      'api::passport.passport'
    >;
    locale: StringAttribute;
  };
}

export interface ApiPassportMethodPassportMethod extends CollectionTypeSchema {
  info: {
    singularName: 'passport-method';
    pluralName: 'passport-methods';
    displayName: 'PassportMethod';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    passportMethodName: StringAttribute;
    medianYearsToReceive: FloatAttribute;
    body: RichTextAttribute;
    passport: RelationAttribute<
      'api::passport-method.passport-method',
      'manyToOne',
      'api::passport.passport'
    >;
    methodType: EnumerationAttribute<
      ['roots', 'Living', 'Child', 'Wedding', 'Process']
    >;
    country_2: RelationAttribute<
      'api::passport-method.passport-method',
      'manyToOne',
      'api::country2.country2'
    >;
    oldPassport: JSONAttribute &
      CustomField<'plugin::multi-select.multi-select', ['drop']>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::passport-method.passport-method',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::passport-method.passport-method',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiQualityOfLifeQualityOfLife extends CollectionTypeSchema {
  info: {
    singularName: 'quality-of-life';
    pluralName: 'quality-of-lives';
    displayName: 'QualityOfLife';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    numbeoQualityOfLife: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 200;
      }>;
    worldHappiness: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 10;
      }>;
    worldData: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    ceoWorld: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 100;
      }>;
    country_2: RelationAttribute<
      'api::quality-of-life.quality-of-life',
      'oneToOne',
      'api::country2.country2'
    >;
    goodThing: ComponentAttribute<'plus-and-minus.good-thing', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    badThing: ComponentAttribute<'plus-and-minus.bad-thing', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    body: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    socialProgress: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 100;
      }>;
    humanDevelopment: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      SetMinMax<{
        max: 1;
      }>;
    legatumProsperityIndex: FloatAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::quality-of-life.quality-of-life',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::quality-of-life.quality-of-life',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::quality-of-life.quality-of-life',
      'oneToMany',
      'api::quality-of-life.quality-of-life'
    >;
    locale: StringAttribute;
  };
}

export interface ApiQualityOfLifeConfigQualityOfLifeConfig
  extends SingleTypeSchema {
  info: {
    singularName: 'quality-of-life-config';
    pluralName: 'quality-of-life-configs';
    displayName: 'qualityOfLifeConfig';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    numbeoHint: RichTextAttribute;
    maxNumbeo: FloatAttribute;
    maxHappiness: FloatAttribute;
    maxWorldData: FloatAttribute;
    maxCeoWorld: FloatAttribute;
    maxSocialProgress: FloatAttribute;
    maxHumanDevelopment: FloatAttribute;
    numbeoWeight: FloatAttribute;
    happinessWeight: FloatAttribute;
    worldDataWeight: FloatAttribute;
    ceoWorldWeight: FloatAttribute;
    socialProgressWeight: FloatAttribute;
    humanDevelopmentWeight: FloatAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::quality-of-life-config.quality-of-life-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::quality-of-life-config.quality-of-life-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiRelocatorHelperRelocatorHelper
  extends CollectionTypeSchema {
  info: {
    singularName: 'relocator-helper';
    pluralName: 'relocator-helpers';
    displayName: 'RelocatorHelper';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::relocator-helper.relocator-helper',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::relocator-helper.relocator-helper',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiReplaceReplace extends SingleTypeSchema {
  info: {
    singularName: 'replace';
    pluralName: 'replaces';
    displayName: 'Replace';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    raplaces: ComponentAttribute<'config.replace', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::replace.replace',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::replace.replace',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiResidenceResidence extends CollectionTypeSchema {
  info: {
    singularName: 'residence';
    pluralName: 'residences';
    displayName: 'Residence';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    residenceOptions: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['Income', 'Buy m2', 'Bank Deposit', 'Rent m2', 'Work', 'Wedding']
      >;
    remoteIncomMin: FloatAttribute;
    remoteIncomeTax: FloatAttribute;
    m2BuyMin: FloatAttribute;
    m2RentMin: FloatAttribute;
    shortBody: RichTextAttribute;
    body: RichTextAttribute;
    weddingYearsForResidence: FloatAttribute;
    weddingYearsForPassport: FloatAttribute;
    investMin: FloatAttribute;
    country_2: RelationAttribute<
      'api::residence.residence',
      'oneToOne',
      'api::country2.country2'
    >;
    residenceMethod: ComponentAttribute<'residence.method', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::residence.residence',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::residence.residence',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiResidenceMethodResidenceMethod
  extends CollectionTypeSchema {
  info: {
    singularName: 'residence-method';
    pluralName: 'residence-methods';
    displayName: 'ResidenceMethod';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    country_2: RelationAttribute<
      'api::residence-method.residence-method',
      'manyToOne',
      'api::country2.country2'
    >;
    methodType: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          'Invest',
          'Deposit',
          'Gift to gov',
          'Real Estate Buy',
          'Rent',
          'Personal Business',
          'Firm'
        ]
      >;
    residenceMethod: ComponentAttribute<
      'residence.residence-method-rules',
      true
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::residence-method.residence-method',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::residence-method.residence-method',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiSourceListSourceList extends SingleTypeSchema {
  info: {
    singularName: 'source-list';
    pluralName: 'source-lists';
    displayName: 'sourceList';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    list: RichTextAttribute;
    medicineSources: RichTextAttribute;
    financeSource: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::source-list.source-list',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::source-list.source-list',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTranslateTranslate extends SingleTypeSchema {
  info: {
    singularName: 'translate';
    pluralName: 'translates';
    displayName: 'Translates';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    translate: ComponentAttribute<'config.translate', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::translate.translate',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::translate.translate',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiVisaVisa extends CollectionTypeSchema {
  info: {
    singularName: 'visa';
    pluralName: 'visas';
    displayName: 'Visa';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    visaDays: IntegerAttribute;
    visaRulesForCountry: EnumerationAttribute<
      ['russia', 'ukraine', 'kazakhstan']
    > &
      DefaultTo<'russia'>;
    localPassportEnter: EnumerationAttribute<
      ['Only International', 'Local Allowed']
    > &
      DefaultTo<'Only International'>;
    visaRun: EnumerationAttribute<['Allowed', 'Limited', 'Disallowed']>;
    visaType: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['Visa Free', 'Digital Visa / eVisa', 'Airport Visa', 'Visa Required']
      >;
    insurance: EnumerationAttribute<['Must be', 'Not required', 'Recommend']>;
    backTickets: EnumerationAttribute<['Must be', 'Recommended', 'Not needed']>;
    cashBorderLimit: FloatAttribute;
    ofDays: IntegerAttribute;
    title: StringAttribute;
    country_2: RelationAttribute<
      'api::visa.visa',
      'manyToOne',
      'api::country2.country2'
    >;
    shortBody: RichTextAttribute;
    body: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::visa.visa', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::visa.visa', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface CityEcology extends ComponentSchema {
  info: {
    displayName: 'ecology';
    description: '';
  };
  attributes: {
    numbeoAirQuality: FloatAttribute;
    iqAirQuality: FloatAttribute;
  };
}

export interface CityFinance extends ComponentSchema {
  info: {
    displayName: 'finance';
    description: '';
  };
  attributes: {
    numbeoIncome: FloatAttribute;
    numbeoCost: FloatAttribute;
    livingCostCost: FloatAttribute;
    livingCostIncome: FloatAttribute;
    expatistanCost: FloatAttribute;
  };
}

export interface CityMedicine extends ComponentSchema {
  info: {
    displayName: 'medicine';
  };
  attributes: {
    numbeoQuality: FloatAttribute;
    livingCostMedWeek: FloatAttribute;
    livingCostDoctorVisit: FloatAttribute;
    expatistanDoctorVisit: FloatAttribute;
  };
}

export interface ClimateClimate extends ComponentSchema {
  info: {
    displayName: 'nature-climate-ecology';
    description: '';
  };
  attributes: {
    winterTemp: FloatAttribute;
    summerTemp: FloatAttribute;
    summerRainDays: FloatAttribute;
    winterSnowDays: FloatAttribute;
    humidityMin: FloatAttribute;
    humidityMax: FloatAttribute;
    sunnyDaysYear: FloatAttribute;
    cloudyDaysYear: FloatAttribute;
    tags: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          '\u0426\u0443\u043D\u0430\u043C\u0438',
          '\u0423\u0440\u0430\u0433\u0430\u043D\u044B',
          '\u0417\u0435\u043C\u043B\u0435\u0442\u0440\u044F\u0441\u0435\u043D\u0438\u044F',
          '\u0422\u0451\u043F\u043B\u043E\u0435 \u043C\u043E\u0440\u0435',
          '\u0425\u043E\u043B\u043E\u0434\u043D\u043E\u0435 \u043C\u043E\u0440\u0435',
          '\u0413\u043E\u0440\u044B',
          '\u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u043A\u043B\u0438\u043C\u0430\u0442',
          '\u041F\u043B\u043E\u0445\u043E\u0439 \u043A\u043B\u0438\u043C\u0430\u0442',
          '\u041E\u0447\u0435\u043D\u044C \u0432\u043B\u0430\u0436\u043D\u043E',
          '\u0412\u043B\u0430\u0436\u043D\u043E',
          '\u0421\u0443\u0445\u043E',
          '\u041E\u0447\u0435\u043D\u044C \u0441\u0443\u0445\u043E',
          '\u0416\u0430\u0440\u043A\u043E',
          '\u041F\u0435\u043A\u043B\u043E',
          '\u041F\u0440\u043E\u0445\u043B\u0430\u0434\u043D\u043E',
          '\u0425\u043E\u043B\u043E\u0434\u043D\u043E',
          '\u0412\u0435\u0442\u0440\u0435\u043D\u043D\u043E',
          '\u0421\u043E\u043B\u043D\u0435\u0447\u043D\u043E',
          '\u041F\u0430\u0441\u043C\u0443\u0440\u043D\u043E',
          '\u0421\u043E\u043B\u043D\u0446\u0435 \u043A\u0440\u0443\u0433\u043B\u044B\u0439 \u0433\u043E\u0434'
        ]
      >;
    shortBody: RichTextAttribute;
  };
}

export interface ConfigCrimeConfig extends ComponentSchema {
  info: {
    displayName: 'crimeConfig';
    description: '';
  };
  attributes: {
    numbeoCrimeMax: FloatAttribute;
    numbeoCrimeWeight: FloatAttribute;
    peaceRatingMax: FloatAttribute;
    peaceRatingWeight: FloatAttribute;
    corruptionPerceptionMax: FloatAttribute;
    corruptionPerceptionWeight: FloatAttribute;
    homicide100kMax: FloatAttribute;
    homicide100kWeight: FloatAttribute;
    gallupLawMax: FloatAttribute;
    gallupLawWeight: FloatAttribute;
    womenSecurityMax: FloatAttribute;
    womenSecurityWeight: FloatAttribute;
    insurlyRatingMax: FloatAttribute;
    insurlyRatingWeight: FloatAttribute;
    roadDeathPer100kMax: FloatAttribute;
    roadDeathPer100kWeight: FloatAttribute;
    kidnappingPer100kMax: FloatAttribute;
    kidnappingPer100kWeight: FloatAttribute;
    ocIndexMax: FloatAttribute;
    ocIndexWeight: FloatAttribute;
    numbeoCrimeWhat: RichTextAttribute;
    peaceRatingWhat: RichTextAttribute;
    corruptionPerceptionWhat: RichTextAttribute;
    homicide100kWhat: RichTextAttribute;
    gallupLawWhat: RichTextAttribute;
    womenSecurityWhat: RichTextAttribute;
    insurlyRatingWhat: RichTextAttribute;
    roadDeathPer100kWhat: RichTextAttribute;
    kidnappingPer100kWhat: RichTextAttribute;
    ocIndexWhat: RichTextAttribute;
  };
}

export interface ConfigMedicineConfig extends ComponentSchema {
  info: {
    displayName: 'medicineConfig';
    description: '';
  };
  attributes: {
    numbeoHealthMax: FloatAttribute;
    numbeoHealthWeight: FloatAttribute;
    globalHealthSecurityMax: FloatAttribute;
    globalHealthSecurityWeight: FloatAttribute;
    ceoWorldMedicineMax: FloatAttribute;
    ceoWorldMedicineWeight: FloatAttribute;
    covidProtectionMax: FloatAttribute;
    covidProtectionWeight: FloatAttribute;
    legatumHealthMax: FloatAttribute;
    legatumHealthWeight: FloatAttribute;
    covidVaccinatedMax: FloatAttribute;
    covidVaccinatedWeight: FloatAttribute;
    numbeoHealthWhat: RichTextAttribute;
    globalHealthSecurityWhat: RichTextAttribute;
    ceoWorldMedicineWhat: RichTextAttribute;
    covidProtectionWhat: RichTextAttribute;
    legatumHealthWhat: RichTextAttribute;
    covidVaccinatedWhat: RichTextAttribute;
  };
}

export interface ConfigQualityOfLifeConfig extends ComponentSchema {
  info: {
    displayName: 'qualityOfLifeConfig';
  };
  attributes: {
    numbeoQoLMax: FloatAttribute;
    numbeoQoLWeight: FloatAttribute;
    happinessMax: FloatAttribute;
    happinessWeight: FloatAttribute;
    worldDataMax: FloatAttribute;
    worldDataWeight: FloatAttribute;
    ceoWorldMax: FloatAttribute;
    ceoWorldWeight: FloatAttribute;
    socialProgressMax: FloatAttribute;
    socialProgressWeight: FloatAttribute;
    humanDevelopmentMax: FloatAttribute;
    humanDevelopmentWeight: FloatAttribute;
    numbeoQoLWhat: RichTextAttribute;
    happinessWhat: RichTextAttribute;
    worldDataWhat: RichTextAttribute;
    ceoWorldWhat: RichTextAttribute;
    socialProgressWhat: RichTextAttribute;
    humanDevelopmentWhat: RichTextAttribute;
  };
}

export interface ConfigReplace extends ComponentSchema {
  info: {
    displayName: 'replace';
  };
  attributes: {
    from: StringAttribute;
    to: StringAttribute;
  };
}

export interface ConfigTranslate extends ComponentSchema {
  info: {
    displayName: 'translate';
  };
  attributes: {
    param: StringAttribute;
    ruLabel: StringAttribute;
    enLabel: StringAttribute;
  };
}

export interface CountryCity extends ComponentSchema {
  info: {
    displayName: 'City';
    icon: 'city';
    description: '';
  };
  attributes: {
    cityName: StringAttribute;
    rentCost: IntegerAttribute;
    foodCost: IntegerAttribute;
    internetSpeed: IntegerAttribute;
    lifeCost: IntegerAttribute;
    languages: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          'GE',
          'ES',
          'FR',
          '\u041A\u0430\u0437\u0430\u0445\u0441\u043A\u0438\u0439:KAZ',
          '\u0410\u0440\u043C\u044F\u043D\u0441\u043A\u0438\u0439:ARM'
        ]
      >;
    defaultCity: BooleanAttribute & DefaultTo<true>;
    ruLangPercent: IntegerAttribute;
    enLangPercent: IntegerAttribute;
    medicineRating: FloatAttribute;
    medicineComment: RichTextAttribute;
    safeRating: FloatAttribute;
    safeComment: RichTextAttribute;
    workRating: FloatAttribute;
    workComment: RichTextAttribute;
    medicineOptions: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          'Free for All - Good',
          'Free for All - Okay',
          'Free for All - Bad',
          'Free for Residence - Good',
          'Free for Residence - Okay',
          'Free for Residence - Bad',
          'Paid for All - Good',
          'Paid for All - Okay',
          'Paid for All - Bad',
          '',
          'Paid quality - Good',
          'Paid quality - Okay',
          'Paid quality - Bad',
          '',
          'Free quality - Good',
          'Free quality - Okay',
          'Free quality - Bad'
        ]
      >;
    freeMedFor: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['All', 'Residence', 'Passport', 'Tourist', 'Visa']
      >;
  };
}

export interface CountryFinance extends ComponentSchema {
  info: {
    displayName: 'Finance';
    icon: 'hand-holding-usd';
    description: '';
  };
  attributes: {
    banksComment: RichTextAttribute;
    bank: ComponentAttribute<'finance.bank', true>;
    crypto: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          'full legal',
          'full prohibited',
          'tax',
          'p2p bans',
          'p2p okay',
          'cryptomats'
        ]
      >;
    inflation: FloatAttribute;
    unEmployement: FloatAttribute;
    averageSalary: IntegerAttribute;
    taxPersonal: FloatAttribute;
    currencyName: StringAttribute;
    moreOptions: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          'binance account',
          'binance card',
          'wirex account',
          'wirex card',
          'wise account',
          'wise card',
          'google play account',
          'google play paid apps',
          'google adsence payout',
          'apple dev payout',
          'paypal',
          'vivid',
          'n26'
        ]
      >;
    depositInsurance: JSONAttribute &
      CustomField<'plugin::multi-select.multi-select', ['for all - 5k usd']>;
    taxDataExchange: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['Yes, with russia', 'No, with russia']
      >;
    currencyToUSD: FloatAttribute;
    currencyCode: StringAttribute;
    averageSalarySourse: EnumerationAttribute<['tradingeconomics.com wages']>;
  };
}

export interface CountryPassportMethods extends ComponentSchema {
  info: {
    displayName: 'passportMethods';
    description: '';
  };
  attributes: {
    methodName: StringAttribute;
    documentForPassportSend: FloatAttribute;
    passportReceiveWait: FloatAttribute;
    costToReceive: IntegerAttribute;
    explainPassportMethod: RichTextAttribute;
    oldPassport: EnumerationAttribute<['Drop', 'Save', 'Limited']>;
    isDefaultPassportMethod: BooleanAttribute;
    passportMethodType: EnumerationAttribute<['living', 'roots', 'wedding']>;
  };
}

export interface CountryPassport extends ComponentSchema {
  info: {
    displayName: 'passport';
    description: '';
  };
  attributes: {
    powerHey: IntegerAttribute;
    powerIndex: IntegerAttribute;
    passportComment: RichTextAttribute;
    DualCitizenshipOld: BooleanAttribute;
    DualCitizenshipComment: RichTextAttribute;
    passportImage: MediaAttribute;
    DualCitizenship: EnumerationAttribute<['Prohibited', 'Allowed', 'Limited']>;
  };
}

export interface CountryTempResidence extends ComponentSchema {
  info: {
    displayName: 'Residence';
    icon: 'archway';
    description: '';
  };
  attributes: {
    methodName: StringAttribute;
    costToReceive: DecimalAttribute;
    commentResidence: RichTextAttribute;
    monthToReceive: FloatAttribute;
    monthsActive: FloatAttribute;
    maxMonthsActive: FloatAttribute;
  };
}

export interface CountryVisaRules extends ComponentSchema {
  info: {
    displayName: 'visaRules';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    visaDays: IntegerAttribute;
    noZagran: BooleanAttribute & DefaultTo<false>;
    visaComment: RichTextAttribute;
    visaRun: BooleanAttribute;
    visaOptions: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['No Visa', 'Digital Visa', 'Airport Visa', 'Visa Required']
      >;
    insurance: EnumerationAttribute<['Yes', 'No', 'Recommend']>;
    cashBorderLimit: IntegerAttribute;
    visaDaysOf: IntegerAttribute;
  };
}

export interface DataSourceCatDataSource extends ComponentSchema {
  info: {
    displayName: 'dataSource';
    icon: 'balance-scale';
    description: '';
  };
  attributes: {
    nameOfSource: StringAttribute;
    currentRate: FloatAttribute;
    maxRate: FloatAttribute;
    comment: RichTextAttribute;
    commentEnum: EnumerationAttribute<
      [
        '\u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E \u0441\u0443\u0431\u044A\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0436\u0438\u0437\u043D\u0438 \u043C\u043E\u0436\u0435\u0442 \u0432\u0440\u0430\u0442\u044C, \u043B\u044E\u0434\u0438 \u0432\u0440\u0443\u0442, \u0430 \u0441\u0430\u043C\u043E\u0432\u044B\u043F\u0438\u043B \u044D\u0442\u043E \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0451\u043D\u043D\u043E \u043F\u0440\u0430\u0432\u0434\u0430',
        '\u041F\u043E\u0434\u0441\u0447\u0451\u0442 \u0438\u0442\u043E\u0433\u0430 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E \u0432\u0435\u0441\u0430\u043C, \u043F\u043E \u0432\u0441\u0435\u043C \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\u043C. \u041D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u043E\u0431\u044A\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C \u043F\u043E \u041A\u0430\u0447\u0435\u0441\u0442\u0432\u0443 \u0416\u0438\u0437\u043D\u0438 \u0432 \u0441\u0442\u0440\u0430\u043D\u0435 \u043A\u0430\u043A \u043D\u0430\u043C \u043A\u0430\u0436\u0435\u0442\u0441\u044F.',
        '\u0412\u0435\u0441\u043E\u043C \u043C\u044B \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0432\u0430\u0436\u043D\u043E\u0441\u0442\u044C \u0438 \u0430\u0432\u0442\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u043E\u0441\u0442\u044C \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u043F\u043E \u043D\u0430\u0448\u0435\u043C\u0443 \u043C\u043D\u0435\u043D\u0438\u044E.'
      ]
    >;
  };
}

export interface DynamicDonamyc extends ComponentSchema {
  info: {
    displayName: 'donamyc';
  };
  attributes: {
    dynamicTitle: StringAttribute;
  };
}

export interface FinanceBank extends ComponentSchema {
  info: {
    displayName: 'Bank';
    icon: 'piggy-bank';
    description: '';
  };
  attributes: {
    nameBank: StringAttribute;
    swift: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['all in all out', 'in not for russia', 'out not for russia', 'limited']
      >;
    openBank: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          'only for residence',
          'not for russians',
          'need deposit',
          'for everyone',
          'KYC'
        ]
      >;
    depositMethods: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          'swift from russia',
          'swift from other country',
          'koronaPay',
          'uniStream',
          'contact',
          'westernUnion',
          'crypto low risk',
          'crypto with risk'
        ]
      >;
    sendMoneyMethods: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          'swift in russia',
          'swift in other country',
          'koronaPay',
          'uniStream',
          'contact',
          'westernUnion',
          'crypto low risk',
          'crypto with risk'
        ]
      >;
    cards: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        ['Master Card', 'Visa', 'Virtual', 'Virtual only', 'Limited']
      >;
    bankComment: RichTextAttribute;
    bankIcon: MediaAttribute;
    bankAppIOS: StringAttribute;
    bankRatingIOS: FloatAttribute;
    bankAppAndroid: StringAttribute;
    bankRatingAndroid: FloatAttribute;
    updated: StringAttribute;
    updatedDate: DateAttribute;
  };
}

export interface FinanceTaxType extends ComponentSchema {
  info: {
    displayName: 'taxType';
    description: '';
  };
  attributes: {
    type: EnumerationAttribute<
      ['corpotate', 'personal', 'individual business', 'VAT']
    >;
  };
}

export interface PassportPassportMethods extends ComponentSchema {
  info: {
    displayName: 'passportMethods';
    icon: 'align-left';
    description: '';
  };
  attributes: {
    passportMethodName: StringAttribute;
    passportMethodNumber: FloatAttribute;
    passportMethodType: EnumerationAttribute<
      [
        'Living',
        'Marriage',
        'Child',
        'Deposit',
        'Buy m2',
        'Rent m2',
        'Special',
        'Refuge',
        'Work',
        'Roots'
      ]
    > &
      DefaultTo<'Living'>;
    method_page: RelationAttribute<
      'passport.passport-methods',
      'oneToOne',
      'api::passport-method.passport-method'
    >;
    passportReceiveYears: FloatAttribute;
    oldPassport: EnumerationAttribute<['Drop', 'Save']>;
    exitDaysAllowed: FloatAttribute;
    shortBody: RichTextAttribute;
  };
}

export interface PlusAndMinusBadThing extends ComponentSchema {
  info: {
    displayName: 'badThing';
    description: '';
  };
  attributes: {
    badThing: RichTextAttribute;
    badShort: TextAttribute;
    badShorter: StringAttribute;
  };
}

export interface PlusAndMinusGoodThing extends ComponentSchema {
  info: {
    displayName: 'goodThing';
    description: '';
  };
  attributes: {
    goodThing: RichTextAttribute;
    goodShorter: StringAttribute;
  };
}

export interface ResidenceMethod extends ComponentSchema {
  info: {
    displayName: 'method';
    description: '';
  };
  attributes: {
    title: StringAttribute;
    residenceMethodType: EnumerationAttribute<
      [
        'Invest',
        'Deposit',
        'Gift to gov',
        'Real Estate Buy',
        'Rent',
        'Personal Business',
        'Firm',
        'Nomad Remote Income'
      ]
    >;
    residenceMethodNumber: FloatAttribute;
    method_page: RelationAttribute<
      'residence.method',
      'oneToOne',
      'api::residence-method.residence-method'
    >;
  };
}

export interface ResidenceResidenceMethodRules extends ComponentSchema {
  info: {
    displayName: 'residenceMethodRules';
    description: '';
  };
  attributes: {
    residenceMethodName: StringAttribute;
    residenceMethodType: JSONAttribute &
      CustomField<
        'plugin::multi-select.multi-select',
        [
          'Invest',
          'Deposit',
          'Gift to gov',
          'Real Estate Buy',
          'Rent',
          'Personal Business',
          'Firm'
        ]
      >;
  };
}

export interface SharedMetaSocial extends ComponentSchema {
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
    description: '';
  };
  attributes: {
    socialNetwork: EnumerationAttribute<['Facebook', 'Twitter']>;
    title: StringAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: StringAttribute;
    image: MediaAttribute;
  };
}

export interface SharedSeo extends ComponentSchema {
  info: {
    displayName: 'seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: StringAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaImage: MediaAttribute;
    metaSocial: ComponentAttribute<'shared.meta-social', true>;
    keywords: TextAttribute;
    metaRobots: StringAttribute;
    structuredData: JSONAttribute;
    metaViewport: StringAttribute;
    canonicalURL: StringAttribute;
    metaDescription: RichTextAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::child.child': ApiChildChild;
      'api::city.city': ApiCityCity;
      'api::config.config': ApiConfigConfig;
      'api::country.country': ApiCountryCountry;
      'api::country2.country2': ApiCountry2Country2;
      'api::crime.crime': ApiCrimeCrime;
      'api::crime-config.crime-config': ApiCrimeConfigCrimeConfig;
      'api::currency-config.currency-config': ApiCurrencyConfigCurrencyConfig;
      'api::ecology.ecology': ApiEcologyEcology;
      'api::finance.finance': ApiFinanceFinance;
      'api::language.language': ApiLanguageLanguage;
      'api::medicine.medicine': ApiMedicineMedicine;
      'api::medicine-config.medicine-config': ApiMedicineConfigMedicineConfig;
      'api::nature-climate-ecology.nature-climate-ecology': ApiNatureClimateEcologyNatureClimateEcology;
      'api::page.page': ApiPagePage;
      'api::passport.passport': ApiPassportPassport;
      'api::passport-method.passport-method': ApiPassportMethodPassportMethod;
      'api::quality-of-life.quality-of-life': ApiQualityOfLifeQualityOfLife;
      'api::quality-of-life-config.quality-of-life-config': ApiQualityOfLifeConfigQualityOfLifeConfig;
      'api::relocator-helper.relocator-helper': ApiRelocatorHelperRelocatorHelper;
      'api::replace.replace': ApiReplaceReplace;
      'api::residence.residence': ApiResidenceResidence;
      'api::residence-method.residence-method': ApiResidenceMethodResidenceMethod;
      'api::source-list.source-list': ApiSourceListSourceList;
      'api::translate.translate': ApiTranslateTranslate;
      'api::visa.visa': ApiVisaVisa;
      'city.ecology': CityEcology;
      'city.finance': CityFinance;
      'city.medicine': CityMedicine;
      'climate.climate': ClimateClimate;
      'config.crime-config': ConfigCrimeConfig;
      'config.medicine-config': ConfigMedicineConfig;
      'config.quality-of-life-config': ConfigQualityOfLifeConfig;
      'config.replace': ConfigReplace;
      'config.translate': ConfigTranslate;
      'country.city': CountryCity;
      'country.finance': CountryFinance;
      'country.passport-methods': CountryPassportMethods;
      'country.passport': CountryPassport;
      'country.temp-residence': CountryTempResidence;
      'country.visa-rules': CountryVisaRules;
      'data-source-cat.data-source': DataSourceCatDataSource;
      'dynamic.donamyc': DynamicDonamyc;
      'finance.bank': FinanceBank;
      'finance.tax-type': FinanceTaxType;
      'passport.passport-methods': PassportPassportMethods;
      'plus-and-minus.bad-thing': PlusAndMinusBadThing;
      'plus-and-minus.good-thing': PlusAndMinusGoodThing;
      'residence.method': ResidenceMethod;
      'residence.residence-method-rules': ResidenceResidenceMethodRules;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
