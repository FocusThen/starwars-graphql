# Notes

- GrapQL doesn't respect HTTP, it doesn't care.
  if you got an error back, it's not gonna give you back a status code of an error
  you still gonna get back at 200.

- Schema + Resolvers => Server

- Each individual fields does have its own default resolver

- GraphQL for VSCode Extension.
- Field level input, For instance, if any type for array type then i would always pass off an argument here to be able to manipulate that array. (sort, filter, etc.)

### enum

```diff
 enum {
   TEST
   TEST1
   TEST2
 }
```

### interfaces

```diff
  interfaces Shoe {
    brand: String!
    size: Int!
  }

  type Boot implements Shoe {
    brand: String!
    size: Int!
    hasGrip: Boolean
  }
```

use case

```diff

Query {
  shoes {
    brand
    size
    ... on Boot {
      hasGrip
    }
  }
}

```
