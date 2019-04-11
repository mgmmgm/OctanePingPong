import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { jsPlumb } from 'jsplumb';

@Component({
    templateUrl: './final.component.html',
    styleUrls: ['./final.component.less']
})
export class FinalComponent implements AfterViewInit, OnDestroy{

    private jsPlumbInstance;

    ngAfterViewInit() {
        this.jsPlumbInstance = jsPlumb.getInstance();
        this.drawConnections();
    }

    ngOnDestroy() {
        this.jsPlumbInstance.reset();
    }
    

    drawConnections() {
        let labelName;
        labelName = 'connection';
        this.jsPlumbInstance.connect({
        connector: ['Flowchart', { stub: [112, 67], cornerRadius: 1, alwaysRespectStubs: true }],
        source: 'Source',
        target: 'Target1',
        anchor: ['Right', 'Left'],
        paintStyle: { stroke: '#456', strokeWidth: 4 },
        // overlays: [
        //   ['Label', { label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel' }]
        // ],
        });
    }

}