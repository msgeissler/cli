import type { JsAstEditor } from '@svelte-cli/ast-manipulation';

export function run({ ast, array, object, common, variables }: JsAstEditor): void {
	const array1 = array.createEmpty();

	const object1 = object.create({ test: common.expressionFromString('true') });
	const object2 = object.create({ test2: common.createLiteral('string') });
	array.push(array1, object1);
	array.push(array1, object2);
	array.push(array1, object2); // avoid duplication

	// create declaration so that we serialize everything
	const declaration = variables.declaration(ast, 'const', 'array', array1);
	ast.body.push(declaration);
}