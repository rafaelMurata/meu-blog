## Functional Interfaces: An Overview and Guide

This article details the use of the @FunctionalInterface annotation, the main interfaces in the "java.util.function" package, and covers the concept of "target typing". These additions not only provide cleaner code, but also allow for more reactive design approaches, streamlining Java development.

## Introduction

Java over the years has gone through several significant evolutions. One such revolutionary change was the introduction of functional interfaces and lambda expressions in Java 8. These additions not only simplified the code by reducing verbosity, but also opened the door to functional programming in the Java universe.

The [@FunctionalInterface](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/FunctionalInterface.html) annotation has become a powerful tool, clearly indicating the interfaces that can be used with lambda expressions, ensuring they have only one abstract method. This simplification, combined with the ability of lambda expressions to concisely represent instances of functional interfaces, has brought a new dimension to writing Java code.

In this article, we'll explore the concept of functional interfaces, their main forms, how to work with lambda expressions, and why they are so essential to modern Java development.

```bash
@FunctionalInterface
public interface Greeting {
     void sayHello(String name);
}
```

We now demonstrate the use of a functional interface with a lambda expression:

```bash
Greeting greeting = name -> System.out.println("Hello, " + name);
greeting.sayHello("John");
```
## Key Functional Interfaces

The [Key Functional Interfaces](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/package-summary.html) refer to some predefined interfaces that are provided in the "java.util.function" package since java 8.

**`java.util.function.Predicate<T>`**: That accept an object of generic type T and returns a boolean.

     Main method: boolean test(T t)

**`java.util.function.Function<T,R>`**: That takes an object of generic type T and returns a value of type R.
    
     Main method: R apply(T t)

**`java.util.function.Consumer<T>`**: That takes an object of generic type T and returns no result (void).
    
     Main method: void accept(T t)

**`java.util.function.Supplier<T>`**: This takes no value and returns a value of type T.
    
     Main method: T get()

## Using Lambda Expressions in Java

Now that we've got a basic understanding, let's see lambda expressions in action:

**Predicate:**

```bash
Predicate<String> stringLengthCheck = (s) -> s.length() > 5;
System.out.println(stringLengthCheck.test("HelloWorld"));
// true
```

**Function:**

```bash
Function<String, Integer> stringLengthFunction = (s) -> s.length();
System.out.println(stringLengthFunction.apply("HelloWorld"));
  // 10
```

**Consumer:**

```bash
Consumer<String> stringPrinter = (s) -> System.out.println(s);
stringPrinter.accept("HelloWorld");
// HelloWorld
```

**Supplier:**

```bash
Supplier<Double> randomValue = () -> Math.random();
System.out.println(randomValue.get());
```

## Target Typing

The concept of "target typing" refers to the compiler determining the type of a lambda expression based on the context in which it is used. For example:

```bash
List<String> names = Arrays.asList("Eva", "Adam", "Bob");

// No lambda expressions
names.sort(new Comparator<String>() {
     @Override
     public int compare(String name1, String name2) {
         return name1.length() - name2.length();
     }
});

// With lambda expressions
names.sort((name1, name2) -> name1.length() - name2.length());
```
So in the second example, the Java compiler knows the expected result, as we are trying to create an instance of the "Comparator<String>" interface. So the compiler can infer the types for the parameters "name1 and "name2" as "String" This feature is useful as it makes the code less verbose and cleaner.

## Different functional interfaces

Using the "target typing" concept, the Callable and PrivilegedAction interfaces both share an abstract signature method.

## Callable

The Callable interface is similar to the Runnable interface in that both are designed for classes that want to be run by another thread.

Return: The main difference is that Callable can return a value while Runnable cannot.
Exception: Callable can throw a checked exception, while Runnable cannot.

```bash
@FunctionalInterface
public interface Callable<V> {
     V call() throws Exception;
}
```

```bash
Callable<String> task = () -> {
     // some processing
     return "Result";
};
```

## PrivilegedAction

This interface is used for security sensitive operations. It is often used in the context of an AccessController to allow code to run with special privileges (such as accessing protected resources).

```bash
@FunctionalInterface
public interface PrivilegedAction<T> {
     run();
}
```

```bash
PrivilegedAction<String> action = () -> {
     // sensitive operation
     return "Sensitive operation completed";
};
String result = AccessController.doPrivileged(action);
```

## Comparator

The Comparator interface is used

a mainly for ordering. It is a functional interface that represents an overall order (or a sorting criterion) on some objects of a specific type.

```bash
@FunctionalInterface
public interface Comparator<T> {
     int compare(T o1, T o2);
     // other default and static methods...
}
```

```bash
List<String> names = Arrays.asList("Eva", "Adam", "Bob");
names.sort(Comparator.naturalOrder());

```
Or, with a lambda expression:

```bash
names.sort((name1, name2) -> name1.length() - name2.length());
// sort by name length
```

## Conclusion

Functional interfaces and lambda expressions have revolutionized the way we write code in Java. These additions to Java 8 not only provide cleaner, more cohesive code, but also leverage functional programming, allowing developers to take advantage of more reactive design patterns and architectures. By understanding and embracing these concepts, developers can build more efficient, readable, secure, and scalable applications.