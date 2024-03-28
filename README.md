# Sample StepZen

### Add the endpoint
```
stepzen import curl <endpoint> --query-name "user" --query-type "User" --name "user" --path-params '/users/$userId'
```

# Add the @materializer to allow for deeper nesting
```
type User {
  firstName: String
  friendIds: [String]
  interests: [String]
  lastName: String
  friends: [User]
  @materializer(query: "users", arguments: [{name:"userIds", field:"friendIds"}])
}

type Query {
  user(userId: String!): User
  @rest(
    endpoint: "<endpoint>"
  )

  users(userIds: [String]): [User]
  @sequence (steps:[{query: "echo"}, {query: "user"}])

  echo(userIds: [String]): [String]
  @rest (endpoint: "stepzen:empty"
          ecmascript: """
          function transformREST(s){
              var userIds = get('userIds')
              return userIds
          }
          """
        )
}
```

Source: https://github.com/stepzen-dev/snippets/blob/7ea2745f314ccfe3429419c98028e4c22a049986/sequence/forLoops/api.graphql#L4