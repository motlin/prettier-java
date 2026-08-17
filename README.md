# Prettier Java Next Line

Prettier Java Next Line forks
[prettier-plugin-java](https://github.com/jhipster/prettier-java) to make brace
placement configurable, with next-line braces as the default.

[Upstream declined the option](https://github.com/jhipster/prettier-java/pull/840)
because Prettier Java intentionally supports one brace style.

## Why next line is the default

Same-line formatting made sense on small, low-resolution CRT displays where
every row counted.

On a modern display, we would rather spend one extra line and see the shape of
the block.

## Install

Follow the [upstream instructions](https://github.com/jhipster/prettier-java#readme),
replacing `prettier-plugin-java` with `prettier-java-next-line`:

```bash
npm install --save-dev prettier prettier-java-next-line
```

Load the plugin explicitly:

```json
{
	"plugins": ["prettier-java-next-line"]
}
```

Set `braceStyle` only when a project needs the inherited same-line style:

```json
{
	"plugins": ["prettier-java-next-line"],
	"braceStyle": "same-line"
}
```

To use the matching Prettier runtime fork too, install it under the name
`prettier` with an npm alias:

```bash
npm install --save-dev \
	prettier@npm:prettier-next-line \
	prettier-java-next-line
```

## Spotless Maven

Spotless loads a package named `prettier`, so install Prettier Next Line under
that name with an npm alias:

```xml
<prettier>
	<devDependencies>
		<prettier>npm:prettier-next-line@3.10.0</prettier>
		<prettier-java-next-line>2.10.3</prettier-java-next-line>
	</devDependencies>
	<configFile>.prettierrc.json5</configFile>
	<config>
		<parser>java</parser>
		<plugins>prettier-java-next-line</plugins>
	</config>
</prettier>
```

## Example

```java
public class Example
{
	public void method()
	{
		if (condition)
		{
			doSomething();
		}
	}
}
```

## Upstream

Except for brace placement, behavior comes from
[Prettier Java](https://github.com/jhipster/prettier-java#readme).

## License

Apache-2.0
