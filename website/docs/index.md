# Prettier Java Next Line

Prettier Java Next Line forks [Prettier Java](https://github.com/jhipster/prettier-java) to add configurable brace placement, defaulting to `next-line`.

## Why next line is the default

Same-line formatting made sense on small, low-resolution CRT displays where every row counted.

On a modern display, we would rather spend one extra line and see the shape of the block.

```java
public class Example
{
	public void run()
	{
		if (ready)
		{
			start();
		}
	}
}
```

## What changed

The fork adds `braceStyle`. [Upstream declined the option](https://github.com/jhipster/prettier-java/pull/840) because Prettier Java intentionally supports one brace style.

```json
{
	"braceStyle": "same-line"
}
```

Everything else follows the [upstream documentation](https://github.com/jhipster/prettier-java#readme).
