## Unit Testing: Comparing Spring Boot and Traditional Approaches
Brief description of the importance of unit testing and the evolution of tools and frameworks to perform these tests in Java applications.

## What are Unit Tests?
They are codes written with the aim of testing, applied to their classes and methods, providing different scenarios for their behaviors. Increasing software correctness and quality. Favoring simplicity, practicality, cost and immediate feedback on the target code.
By applying these techniques, software systems favor regression testing and the discovery of possible unwanted behaviors "bugs". Depending on the size and complexity of the system, it may require a lot of effort to apply the test cases.

## Difference between unit, integration and system testing and end-to-end
In unit testing, the objective is to test small units of code and receive feedback on their quality. Integration tests focus on the interaction between two or more units. In both cases the objective is to provide better quality and correctness of the software.
In end-to-end tests, the object is to simulate the behavior of the system as a whole, generally using a significant amount of time for execution, also known as acceptance tests.

## A convention for testing:
In unit testing, the convention/pattern of Arrange (or Setup), Act (or Exercise) and Assert (or Verify) is generally followed.
For example:
```java
public class Calculator {
     public int add(int a, int b) {
         return a + b;
     }
}
```
Now, let's write a unit test for this class:

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {

     @Test
     public void testAddition() {
         // Setup (or Arrange)
         Calculator calculator = new Calculator();
         int expectedSum = 5;
         int a = 2;
         int b = 3;

         // Exercise (or Act)
         int result = calculator.add(a, b);

         // Verify (or Assert)
         assertEquals(expectedSum, result, "The additional result should be 5");
     }
}
```
In this example:

**Setup/Arrange:** We create an instance of the Calculator class and define the values that we will use in the test.
**Exercise/Act:** We invoke the method we want to test and get the result.
**Verify/Assert:** We check whether the result obtained corresponds to what we expected. If it doesn't match, the test fails.

This structure helps keep the test clear and helps you understand what each part of the test is doing.

## Testing with Spring Boot:

**Benefits of using Spring Boot for unit testing**
Simplified Configuration: Leveraging configuration convention.
Spring Boot Test: A tool that integrates common testing libraries such as JUnit and TestNG.
Integrated Mocks: Using **@MockBean** to create mock versions of Spring components, such as repositories or services.


**Creating a Unit Test with Spring Boot**

Let's assume we have a service in Spring Boot called GreetingService:
```java
@Service
public class GreetingService {

     public String greet() {
         return "Hello, World!";
     }
}
```
In this Spring Boot example, the Spring test context is loaded, and the GreetingService is automatically injected into the test, making it easier to test Spring components.

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.jupiter.api.Test;

@SpringBootTest
public class GreetingServiceTest {

     @Autowired
     private GreetingService greetingService;

     @Test
     public void testGreet() {
         assertEquals("Hello, World!", greetingService.greet());
     }
}
```
Remember, these are simple examples for demonstration. In real projects, you will probably have more complex cases, such as interaction with databases, calls to external APIs, among others. For these scenarios, you would use other Spring Boot Test functionality, such as **@MockBean** to create mock Spring beans or **TestRestTemplate** to test REST endpoints.

**Example usage for @MockBean**

@MockBean is a Spring Boot Test annotation, used to add mocks within a Spring test context. It is used to create a mocked version of a bean within the Spring context and can be useful for decoupling your tests from external components such as databases, external services, among others.

Suppose you have a service that retrieves information from a repository:
```java
@Service
public class UserService {

     @Autowired
     private UserRepository userRepository;

     public User getUserById(Long id) {
         return userRepository.findById(id).orElse(null);
     }
}
```
Now, if we want to test the UserService without actually querying the database, we can mock the UserRepository:

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

     @Autowired
     private UserService userService;

     @MockBean
     private UserRepository userRepository;

     @Test
     public void testGetUserById() {
         User mockUser = new User("John", "Doe");
         Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

         User user = userService.getUserById(1L);

         assertEquals("John", user.getFirstName());
         assertEquals("Donate", user.getLastName());
     }
}
```
In the example above, when using @MockBean, the real UserRepository is replaced in the test context by the mock, and then we configure this mock to return a specific user when the findById method is called.

**TestRestTemplate**

TestRestTemplate is a Spring Boot Test class that makes it easy to make HTTP calls in integration tests. With it, you can test your REST endpoints the same way a customer would, but within the test environment.
Suppose you have the following controller:
```java
@RestController
@RequestMapping("/api/users")
public class UserController {

     @Autowired
     private UserService userService;

     @GetMapping("/{id}")
     public ResponseEntity<User> getUserById(@PathVariable Long id) {
         User user = userService.getUserById(id);
         if (user != null) {
             return ResponseEntity.ok(user);
         } else {
             return ResponseEntity.notFound().build();
         }
     }
}
```
Now, you can test this controller using TestRestTemplate:
```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserControllerTest {

     @Autowired
     private TestRestTemplate restTemplate;

     @MockBean
     private UserService userService;

     @Test
     public void testGetUserById() {
         User mockUser = new User("John", "Doe");
         Mockito.when(userService.getUserById(1L)).thenReturn(mockUser);

         ResponseEntity<User> response = restTemplate.getForEntity("/api/users/1", User.class);

         assertEquals(HttpStatus.OK, response.getStatusCode());
         assertEquals("John", response.getBody().getFirstName());
         assertEquals("Donate", response.getBody().getLastName());
     }
}
```
In the test above, we configured the userService to return a mocked user. We then use TestRestTemplate to make a GET call to our endpoint and verify that the response is as expected.

## Testing without Spring boot:

Suppose we have a simple class called Calculator:
```java
public class Calculator {

     public int sum(int a, int b) {
         return a + b;
     }

     public int subtract(int a, int b) {
         return a - b;
     }
}
```
Here is a basic unit test for this class using JUnit:

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class CalculadoraTest {

     @Test
     public void testSum() {
         Calculator calculator = new Calculator();
         assertEquals(5, calculator.sum(2, 3));
     }

     @Test
     public void testSubtract() {
         Calculator calculator = new Calculator();
         assertEquals(1, calculator.subtract(3, 2));
     }
}
```

## Comparison: Spring Boot vs. Traditional Approach
**Pros and Cons of Testing with Spring Boot**
Pros:

Easy integration with the Spring ecosystem.
Conventions and automatic configuration reduce boilerplate code.
Robust support for integration testing.

Cons:

Increased initialization time for tests due to the Spring context.
The learning curve for developers unfamiliar with Spring.

**Pros and Cons of Testing without Spring Boot**
Pros:

Faster initialization, as it does not load the Spring context.
More generic approach that can be applied to any Java application.

Cons:

More manual configuration and boilerplate code.
Fewer tools and integrations available out of the box.

## Conclusion
Reflection on the importance of choosing the right approach based on the needs of the project. Both approaches have their merits, and the choice between Spring Boot and traditional methods must consider the nature of the application, the team's experience, and specific testing requirements.
Ensuring software quality is generally a slow and costly process, although these types of approaches favor a reduction in the defect rate.
As technology advances, new tools and techniques continue to emerge, making the process of ensuring software quality increasingly refined.