angular.module('main')
.controller('CodeViewerController', [
    '$scope', '$uibModalInstance', 'icon',
    function ($scope, $uibModalInstance, icon) {

        icon = icon || { data: '' };

        $scope.icon = icon;

        $scope.code = {
            svgTag: [
                '<svg style="width:24px;height:24px" viewBox="0 0 24 24">',
                '    <path fill="currentColor" d="' + icon.data + '" />',
                '</svg>'
            ].join("\r\n"),
            svgFile: [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24">',
                '   <path fill="#000000" d="' + icon.data + '" />',
                '</svg>'
            ].join("\r\n"),
            xamlTag: [
                '<Viewbox Width="48" Height="48">',
                '    <Canvas Width="24" Height="24">',
                '        <Path Fill="Black" Data="' + icon.data + '" />',
                '    </Canvas>',
                '</Viewbox>'
            ].join("\r\n"),
            xamlDrawImageTag: [
                '<DrawingImage xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">',
                '    <DrawingImage.Drawing>',
                '        <GeometryDrawing Brush="Black" Geometry="' + icon.data + '" />',
                '    </DrawingImage.Drawing>',
                '</DrawingImage>'
            ].join("\r\n"),
            drawableTag: [
                '<vector xmlns:android="http://schemas.android.com/apk/res/android"',
                '    android:height="24dp"',
                '    android:width="24dp"',
                '    android:viewportWidth="24"',
                '    android:viewportHeight="24">',
                '    <path android:fillColor="#000" android:pathData="' + icon.data + '" />',
                '</vector>'
            ].join("\r\n")
        };

        $scope.downloadXaml = function () {
            window.location = '/api/download/icon/xaml/' + icon.id;
        };

        $scope.downloadXamlDrawImage = function () {
            window.location = '/api/download/icon/xamldrawimage/' + icon.id;
        };

        $scope.downloadCompressedSvg = function () {
            window.location = '/api/download/icon/svg/' + icon.id;
        };

        $scope.downloadWebfontSvg = function () {
            window.location = '/api/download/icon/svgwebfont/' + icon.id;
        };
        $scope.downloadVectorDrawable = function () {
            window.location = '/api/download/icon/vectordrawable/' + icon.id;
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);