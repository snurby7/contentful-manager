# Contentful Node

## Packages

- eslint
- typescript
- contentful-export
- contentful-import
- contentful-management

## Startup

```bash
 git clone git@github.com:snurby7/contentful-manager.git
 yarn
 # Go to contentful > settings > api keys > content management tokens > Generate Personal token > copy personal token
 # create file `keys/contentful.keys.ts` see the structure below
 yarn start
```

**`keys/contentful.keys.ts`**

```js
export const ContentfulManagementToken = "<your-copied-management-token-here>";
```

## Happy hacking!!
