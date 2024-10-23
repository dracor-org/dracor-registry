# dracor-registry

Registry of DraCor corpora

This registry provides a list of available and planned
[DraCor](https://dracor.org) corpora with some meta data for each corpus. The
data is collected from the `corpus.xml` files in the individual corpus
repositories.

The list is available in JSON format, see [corpora.json](corpora.json) or as a
node package:

```sh
npm install @dracor/registry
```

Then package exports the corpora list as default:

```js
import corpora from '@dracor/registry';
console.log(corpora);
```

## Status

The `status` metadata field indicates the availability and stability of each
corpus. there are currently three recognized values:

- **published:** the corpus is considered stable and is available at
  https://dracor.org
- **draft:** the corpus is currently under development and can be previewed on
  https://staging.dracor.org
- **proposed:** the corpus is planned or in very early development. The
  repository may or may not be publicly available.

These values are a subset of the suggested values in the TEI specification (see
https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-att.docStatus.html).

The status of a corpus can be indicated in its `corpus.xml` file using the
[revisionDesc](https://tei-c.org/release/doc/tei-p5-doc/en/html/ref-revisionDesc.html)
element:

```xml
<revisionDesc status="draft">
  <change when="2018-12-12" status="proposed"/>
  <change when="2020-07-17" status="draft"/>
</revisionDesc>
```

The [update script](#update) uses either the `status` attribute of the
`revisionDesc` element or, if this is not available, the `status` attribute of
the latest `change` element (i.e. the one with the most recent date in `@when`).

## Query

```
jq '.[] | select(.name == "ger")'  < corpora.json
```

## Update

The registry can be updated by running the update script (`yarn update`). This
script retrieves the corpus.xml from each repository listed in `corpora.json`,
extracts the relevant meta data and updates the respective fields in
`corpora.json`. Fields that exist in `corpora.json` but have no equivalent in
the `corpus.xml` are left untouched.

You need to have `node` and `yarn` installed.

```sh
cd dracor-registry
yarn
yarn update
# or using personal access token for GitHub API
GITHUB_API_TOKEN=yourpersonalaccesstoken yarn update
```

## Publication

To release a new version to npmjs.com you need to be a member of the
[dracor organization](https://www.npmjs.com/org/dracor).

```sh
yarn release
```
