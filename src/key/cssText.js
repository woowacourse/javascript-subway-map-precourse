const cssText = {
	DEFAULT_BOLD_TEXT: 'font-size:1.5em; font-weight: 800;',
	boldText: (fontSize, fontWeight) =>
		`font-size:${fontSize}em; font-weight: ${fontWeight};`,
	marginBottom: (value) => `margin-bottom:${value}px;`,
	marginRight: (value) => `margin-right:${value}px;`,
    marginTop: (value) => `margin-top:${value}px;`,
    BOLDER: "border: 1px solid #444444;"
    
    
};

export default cssText;
