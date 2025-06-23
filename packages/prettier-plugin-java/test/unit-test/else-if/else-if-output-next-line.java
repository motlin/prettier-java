public class ElseIfTest
{
  public void testBasicElseIf(int value)
  {
    // Basic else if
    if (value < 0)
    {
      System.out.println("Negative");
    }
    else if (value == 0)
    {
      System.out.println("Zero");
    }
    else
    {
      System.out.println("Positive");
    }

    // Multiple else ifs
    if (value < -10)
    {
      System.out.println("Very negative");
    }
    else if (value < 0)
    {
      System.out.println("Negative");
    }
    else if (value == 0)
    {
      System.out.println("Zero");
    }
    else if (value > 10)
    {
      System.out.println("Very positive");
    }
    else
    {
      System.out.println("Positive");
    }

    // Else if without final else
    if (value < 0)
    {
      System.out.println("Negative");
    }
    else if (value == 0)
    {
      System.out.println("Zero");
    }

    // Nested else if
    if (value != 0)
    {
      if (value < 0)
      {
        System.out.println("Negative non-zero");
      }
      else if (value > 0)
      {
        System.out.println("Positive non-zero");
      }
    }

    // Without braces
    if (value < 0)
      System.out.println("Negative");
    else if (value == 0)
      System.out.println("Zero");
    else
      System.out.println("Positive");

    // Mixed braces
    if (value < 0)
    {
      System.out.println("Negative");
    }
    else if (value == 0)
      System.out.println("Zero");
    else
    {
      System.out.println("Positive");
    }
  }
}