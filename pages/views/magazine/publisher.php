<div class="publisher-preview col-lg-8">
	<div class="publisher-canvas">
		<div class="publisher-padding"></div>
		<div class="publisher-content">
			<div id="box-a" class="region"></div>
			<div id="box-b" class="region"></div>
			<div id="box-c" class="region"></div>
			<div id="content">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend dapibus felis, a consectetur nisl aliquam at. Aliquam quam augue, molestie a scelerisque nec, accumsan non metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus euismod nisi, a egestas sem rhoncus eget. Mauris non tortor arcu. Pellentesque in odio at leo volutpat consequat....
			</div>
		</div>
	</div>
</div>

<div class="publisher-configure col-lg-4">
	<div class="form-group p-regions">
		<div>Regions</div>
		<div class="regions-list">
			<img src=""/>
			<img src=""/>
			<img src=""/>
		</div>
	</div>
	<div class="form-group">
		<div class="col-lg-3">Text</div>
		<div class="col-lg-9">
			<textarea class="non-sce form-input"></textarea>
		</div>
	</div>
	<div class="clearfix"></div>
</div>

<div class="clearfix"></div>
  <style>
    #content {
      flow-into: article;
      -webkit-flow-into: article;
      -moz-flow-into: article;
    }

    .region {
      flow-from: article;
      -webkit-flow-from: article;
      -moz-flow-from: article;
      box-sizing: border-box;
      position: absolute;
      width: 200px;
      height: 200px;
      padding: 10px;
    }

    #box-a {
      border: 1px solid red;
      top: 10px;
      left: 10px;
    }

    #box-b {
      border: 1px solid green;
      top: 210px;
      left: 210px;
    }

    #box-c {
      border: 1px solid blue;
      top: 410px;
      left: 410px;
    }
  </style>

